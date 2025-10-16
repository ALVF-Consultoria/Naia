import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, User, Zap, Globe, MessageSquare } from 'lucide-react';
import IdeaLamp from "./IdeaLamp";

const INITIAL_FORM_DATA = {
  protagonistaNome: '',
  protagonistaDescricao: '',
  protagonistaObjetivo: '',
  antagonistaNatureza: '',
  conflitoPontoPartida: '',
  cenarioLocal: '',
  cenarioEpoca: '',
  cenarioTom: '',
  enredoObstaculo: '',
  enredoClimax: '',
  temaMensagem: '',
};

const stepsConfig = [
  {
    title: "1. Protagonista",
    icon: User,
    description: "Defina o herói da sua história e o que ele busca.",
    fields: [
      { id: 'protagonistaNome', label: 'Nome do Protagonista', type: 'text', placeholder: 'Ex: Arthur' },
      { id: 'protagonistaDescricao', label: 'Descrição do Protagonista', type: 'textarea', placeholder: 'Ex: Jovem ferreiro de coração ingênuo.' },
      { id: 'protagonistaObjetivo', label: 'Objetivo Principal', type: 'text', placeholder: 'Ex: Resgatar a espada mágica roubada.' },
    ],
  },
  {
    title: "2. Antagonista e Conflito",
    icon: Zap,
    description: "Quem ou o que se opõe ao seu herói e como a ação começa.",
    fields: [
      { id: 'antagonistaNatureza', label: 'Natureza do Antagonista', type: 'textarea', placeholder: 'Ex: A Rainha Sombria, consumida pela inveja.' },
      { id: 'conflitoPontoPartida', label: 'Ponto de Partida do Conflito', type: 'text', placeholder: 'Ex: Ele recebe uma carta misteriosa em um dia chuvoso.' },
    ],
  },
  {
    title: "3. Cenário e Atmosfera",
    icon: Globe,
    description: "Onde e quando a história se passa e qual o tom emocional.",
    fields: [
      { id: 'cenarioLocal', label: 'Local', type: 'text', placeholder: 'Ex: Reino de Eldoria' },
      { id: 'cenarioEpoca', label: 'Época (ano)', type: 'number', placeholder: 'Ex: 1423' },
      { id: 'cenarioTom', label: 'Tom e Atmosfera', type: 'text', placeholder: 'Ex: Melancólico, com toques de esperança.' },
    ],
  },
  {
    title: "4. Enredo e Clímax",
    icon: BookOpen,
    description: "O maior desafio e o confronto final.",
    fields: [
      { id: 'enredoObstaculo', label: 'O Maior Obstáculo', type: 'textarea', placeholder: 'Ex: Ser capturado e ter que escapar de uma masmorra voadora.' },
      { id: 'enredoClimax', label: 'Ação no Clímax', type: 'text', placeholder: 'Ex: Luta mágica final no topo da torre do Antagonista.' },
    ],
  },
  {
    title: "5. Tema e Mensagem",
    icon: MessageSquare,
    description: "A essência e o significado da sua narrativa.",
    fields: [
      { id: 'temaMensagem', label: 'Mensagem Central/Tema', type: 'textarea', placeholder: 'Ex: A verdadeira força reside na bondade.' },
    ],
  },
];

const FormSummary = ({ data, onRestart, onGenerateStory, onBack, isSubmitting }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-extrabold text-blue-800">🎉 Rascunho da História Concluído!</h2>
    <p className="text-gray-600">Abaixo está o resumo dos elementos que você criou. Use como guia para escrever sua história.</p>

    {stepsConfig.map((step, index) => (
      <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
        <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-2">
          {React.createElement(step.icon, { className: 'w-5 h-5 mr-2' })}
          {step.title}
        </h3>
        <ul className="list-disc ml-5 space-y-1 text-gray-700">
          {step.fields.map(field => (
            <li key={field.id}>
              <span className="font-medium">{field.label}:</span> {String(data[field.id] || "Não preenchido")}
            </li>
          ))}
        </ul>
      </div>
    ))}

    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button
        onClick={onRestart}
        className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition duration-300 shadow-md"
      >
        Recomeçar
      </button>
      <button
        onClick={onGenerateStory}
        disabled={isSubmitting}
        className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Gerando História...' : 'Gerar História'}
      </button>
      <button
        onClick={onBack}
        className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition duration-300 shadow-md"
      >
        Voltar
      </button>
    </div>
  </div>
);

const CurrentStep = ({ step, formData, handleChange, progress, currentStep, totalSteps, handleNext, handleBack, isStepValid }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
      {React.createElement(step.icon, { className: 'w-7 h-7 mr-3 text-blue-500' })}
      {step.title}
    </h2>

    <p className="text-gray-500 mb-6 border-b pb-3">{step.description}</p>

    {step.fields.map(field => (
      <div key={field.id}>
        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea
            id={field.id}
            rows="3"
            value={formData[field.id]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm resize-none"
          />
        ) : (
          <input
            id={field.id}
            type={field.type === 'number' ? 'text' : field.type}
            value={formData[field.id]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
          />
        )}
      </div>
    ))}

    {/* Barra de progresso */}
    <div className="mb-8">
      <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
        <span>Etapa {currentStep > totalSteps ? 'Finalizado' : `${currentStep} de ${totalSteps}`}</span>
        <span>{Math.min(100, Math.round(progress))}% Completo</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div style={{ width: `${progress}%` }} className="h-2.5 bg-blue-600 rounded-full transition-all duration-500 ease-out"></div>
      </div>
    </div>

    <div className="flex justify-between pt-6">
      <button
        onClick={handleBack}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${currentStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
      >
        Voltar
      </button>
      <button
        onClick={handleNext}
        disabled={!isStepValid(currentStep)}
        className={`flex items-center px-6 py-2 rounded-lg font-bold transition duration-200 ${isStepValid(currentStep) ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentStep < totalSteps ? 'Próxima Etapa' : 'Finalizar Rascunho'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);

const StoryForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = stepsConfig.length;
  const progress = (currentStep / (totalSteps + 1)) * 100;

  const handleGenerateStory = async () => {
    if (!onSubmit) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  const handleBackFromSummary = () => {
    setCurrentStep(totalSteps);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-['Inter']">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
            Crie sua História em 5 Passos
          </h1>
          <p className="text-md text-gray-500 mt-2">Desenvolva os pilares da sua narrativa, etapa por etapa.</p>
        </header>

        {currentStep > totalSteps ? (
          <FormSummary
            data={formData}
            onRestart={handleRestart}
            onGenerateStory={handleGenerateStory}
            onBack={handleBackFromSummary}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CurrentStep
            step={stepsConfig[currentStep - 1]}
            formData={formData}
            handleChange={(e) => {
              const { id, value } = e.target;
              const sanitized = id === 'cenarioEpoca' ? value.replace(/[^\d]/g, '') : value;
              setFormData(prev => ({ ...prev, [id]: sanitized }));
            }}
            progress={progress}
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={() => setCurrentStep(prev => prev + 1)}
            handleBack={() => currentStep > 1 && setCurrentStep(prev => prev - 1)}
            isStepValid={(stepIndex) => stepsConfig[stepIndex - 1].fields.every(f => {
              const val = formData[f.id];
              return f.type === 'number' ? val !== '' : val?.trim().length > 0;
            })}
          />
        )}

        <IdeaLamp currentStepData={stepsConfig[currentStep - 1]} />

      </div>
    </div>
  );
};

export default StoryForm;
