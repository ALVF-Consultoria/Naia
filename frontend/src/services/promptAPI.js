// --- VARIÁVEIS GLOBAIS DA API ---
// Acessa a API LanguageModel (Gemini Nano)
const LM = window.LanguageModel || navigator.ai;

// --- FUNÇÕES DE CHECKAGEM E CRIAÇÃO ---

/**
 * Verifica a disponibilidade do modelo Gemini Nano.
 * Retorna uma string que mapeia os estados da API para a lógica da aplicação.
 */
// promptAPI.js

export async function checkModelAvailability() {
    try {
        if (!LM || !LM.availability) {
            console.log("LanguageModel (navigator.ai) não encontrado.");
            return "unavailable";
        }

        const availability = await LM.availability({ outputLanguage: "en" });
        console.log("Model availability:", availability);

        // --- MUDANÇA TEMPORÁRIA DE DEBUG ---
        if (availability === "available") {
            console.warn("DEBUG: Forçando estado 'ready' para tentar criar sessão.");
            return "ready"; // FORÇA O ESTADO PARA READY
        }
        // --- FIM DA MUDANÇA TEMPORÁRIA ---
        
        if (availability === "ready") return "ready";
        if (availability === "downloadable") return "downloadable";
        
        return "unavailable";
    } catch (err) {
        console.error("Erro ao verificar disponibilidade do modelo:", err);
        return "unavailable";
    }
}

/**
 * Cria uma nova sessão com o modelo.
 */
async function createLanguageModelSession() {
    if (!LM || !LM.create) {
        console.warn("LanguageModel não encontrado.");
        return null;
    }

    try {
        // CORREÇÃO: Usar um idioma suportado como 'en'
        const session = await LM.create({
            expectedOutputLanguage: "en",
            temperature: 0.8, // (Sua escolha: aumenta a aleatoriedade/criatividade)
            topK: 40, 
            monitor: (m) => {
                m.addEventListener("downloadprogress", (e) => {
                    const progress = e.total > 0 ? (e.loaded / e.total) * 100 : 0;
                    console.log(`Download progress: ${progress.toFixed(2)}%`);
                });
            },
        });
        console.log("Sessão criada com sucesso!");
        return session;
    } catch (err) {
        console.error("Erro ao criar sessão (Hardware/VRAM/Flags):", err);
        return null;
    }
}

/**
 * Envia o prompt para a sessão do modelo.
 */
async function sendPrompt(session, text) {
    try {
        // CORREÇÃO: Usar um idioma suportado como 'en'
        const response = await session.prompt(text, { outputLanguage: "en" });
        return response;
    } catch (err) {
        console.error("Error sending prompt:", err);
        return "Erro ao processar prompt";
    }
}

// --- Lógica de Sessão Única e Centralizada ---

let sessionInstance = null;
let isSessionChecked = false;

/**
 * Obtém ou cria a sessão, mas apenas se o modelo estiver 'ready'.
 */
export async function getSession() {
    if (sessionInstance) {
        return sessionInstance;
    }

    if (isSessionChecked) {
        return null;
    }

    const state = await checkModelAvailability();
    // A API só permite criar a sessão se o estado for 'ready'.
    if (state !== 'ready') {
        console.warn(`Não foi possível criar a sessão. O estado do modelo é '${state}', mas precisa ser 'ready'.`);
        isSessionChecked = true;
        return null;
    }
    
    sessionInstance = await createLanguageModelSession();
    isSessionChecked = true;
    return sessionInstance;
}

/**
 * Função principal para enviar um prompt, gerenciando a criação da sessão.
 */
export async function promptAPI(prompt) {
    const session = await getSession();

    if (!session) {
        const currentState = await checkModelAvailability();
        // A mensagem de erro é mais amigável, já que você removeu o tipo ModelState
        return `[ERRO] A sessão do Gemini Nano não está ativa. Status: ${currentState.toUpperCase()}. Verifique chrome://components e habilite o "On Device Model" ou verifique chrome://on-device-internals para mais detalhes.`;
    }

    return await sendPrompt(session, prompt);
}