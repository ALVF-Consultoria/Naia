import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, BookOpen, User, Zap, Globe, MessageSquare } from 'lucide-react';
import IdeaLamp from "./IdeaLamp";
import TopWizardProgress from "./TopWizardProgress";
import { useStory } from "../context/StoryContext";
import { INITIAL_FORM_DATA, stepsConfig } from "../constants/storySteps";

const iconMap = { User, Zap, Globe, BookOpen, MessageSquare };

const FormSummary = ({ data, onRestart, onGenerateStory, onBack, isSubmitting }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">🎉 Rascunho da História Concluído!</h2>
      <p className="text-gray-600">Resumo dos elementos que você criou.</p>

      {stepsConfig.map((step, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
          <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-2">
            {React.createElement(iconMap[step.iconName], { className: 'w-5 h-5 mr-2' })}
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
        <button onClick={onRestart} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition duration-300 shadow-md">Recomeçar</button>
        <button onClick={onGenerateStory} disabled={isSubmitting} className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Gerando História...' : 'Gerar História'}
        </button>
        <button onClick={onBack} className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition duration-300 shadow-md">Voltar</button>
      </div>
    </div>
  );
};

const CurrentStep = ({ step, formData, handleChange, currentStep, totalSteps, handleNext, handleBack, isStepValid }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center">
        {React.createElement(iconMap[step.iconName], { className: 'w-7 h-7 mr-3 text-blue-500' })}
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
};

const StoryForm = ({ onSubmit }) => {
  const { formData: ctxFormData, updateFormData } = useStory();
  const [currentStep, setCurrentStep] = useState(1);
  const [localForm, setLocalForm] = useState({ ...INITIAL_FORM_DATA, ...ctxFormData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = stepsConfig.length;

  useEffect(() => {
    setLocalForm(prev => ({ ...prev, ...ctxFormData }));
  }, [ctxFormData]);

  const handleFieldChange = (id, value) => {
    const sanitized = id === 'cenarioEpoca' ? value.replace(/[^\d]/g, '') : value;
    setLocalForm(prev => {
      const next = { ...prev, [id]: sanitized };
      updateFormData({ [id]: sanitized });
      return next;
    });
  };

  const isStepValid = (stepIndex) => {
    const step = stepsConfig[stepIndex - 1];
    if (!step) return false;
    return step.fields.every(f => {
      const val = localForm[f.id];
      if (f.type === 'number') return val !== '' && val !== null && val !== undefined;
      return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
    });
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    setCurrentStep(prev => Math.min(totalSteps + 1, prev + 1));
  };

  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleGenerateStory = async () => {
    if (!onSubmit) return;
    setIsSubmitting(true);
    await onSubmit(localForm);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setLocalForm(INITIAL_FORM_DATA);
    updateFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  };

  const handleBackFromSummary = () => setCurrentStep(totalSteps);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Inter']">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
            Crie sua História em 5 Passos
          </h1>
          <p className="text-md text-gray-500 mt-2">Desenvolva os pilares da sua narrativa, etapa por etapa.</p>
        </header>

        <TopWizardProgress steps={stepsConfig} current={currentStep} />

        {currentStep > totalSteps ? (
          <FormSummary
            data={localForm}
            onRestart={handleRestart}
            onGenerateStory={handleGenerateStory}
            onBack={handleBackFromSummary}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CurrentStep
            step={stepsConfig[currentStep - 1]}
            formData={localForm}
            handleChange={(e) => handleFieldChange(e.target.id, e.target.value)}
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handleBack={handleBack}
            isStepValid={isStepValid}
          />
        )}

        <IdeaLamp currentStepData={stepsConfig[currentStep - 1]} />
      </div>
    </div>
  );
};

export default StoryForm;
