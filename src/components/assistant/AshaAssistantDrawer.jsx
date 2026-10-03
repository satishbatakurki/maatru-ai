import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Languages,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const AshaAssistantDrawer = ({ isOpen, onClose, activePatient }) => {
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'kn'
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Namaste! I am the MaatruAI Care Assistant. I can help coordinate document collection, explain documented tests in plain language, or generate visit reminders for ${activePatient?.name || 'the patient'}. (Note: I provide administrative and educational support only; I cannot diagnose or prescribe medications.)`
    }
  ]);
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const quickPrompts = {
    en: [
      "What documents are still missing?",
      "Generate ASHA home-visit checklist",
      "Explain the 75g OGTT test in simple terms",
      "Draft appointment reminder for mother"
    ],
    hi: [
      "कौन से दस्तावेज़ अभी भी गायब हैं?",
      "आशा कार्यकर्ता के लिए गृह-भेंट चेकलिस्ट बनाएं",
      "OGTT टेस्ट का क्या मतलब है, सरल भाषा में समझाएं",
      "माता के लिए आगामी जांच का संदेश तैयार करें"
    ],
    kn: [
      "ಯಾವ ದಾಖಲೆಗಳು ಇನ್ನೂ ಕಾಣೆಯಾಗಿವೆ?",
      "ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯ ಭೇಟಿ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ರಚಿಸಿ",
      "OGTT ಪರೀಕ್ಷೆಯನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸಿ",
      "ತಾಯಿಗೆ ಮುಂದಿನ ತಪಾಸಣೆಯ ಜ್ಞಾಪನೆ ಸಂದೇಶ ರಚಿಸಿ"
    ]
  };

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');

    // Generate contextual response
    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('missing') || lower.includes('ದಾಖಲೆ') || lower.includes('गायब')) {
        const missingItems = activePatient?.missingInformation?.map(m => `• ${m.title} (${m.category}) - Due: ${m.recommendedWindow}`).join('\n') || "No missing items recorded.";
        reply = `Missing Document Checklist for ${activePatient?.name}:\n${missingItems}\n\nSuggested Next Step: ASHA worker ${activePatient?.ashaWorker?.name} can verify physical slips during the next home check-in.`;
      } else if (lower.includes('ogtt') || lower.includes('glucose') || lower.includes('sugar') || lower.includes('ಸಕ್ಕರೆ')) {
        if (language === 'kn') {
          reply = `OGTT (ಓರಲ್ ಗ್ಲುಕೋಸ್ ಟಾಲರೆನ್ಸ್ ಟೆಸ್ಟ್) ಗರ್ಭಾವಸ್ಥೆಯಲ್ಲಿ ರಕ್ತದ ಸಕ್ಕರೆ ಮಟ್ಟವನ್ನು ಅಳೆಯುವ ಪರೀಕ್ಷೆಯಾಗಿದೆ. ಗರ್ಭಧಾರಣೆಯ 24 ರಿಂದ 28 ವಾರಗಳ ನಡುವೆ ಇದನ್ನು ಮಾಡಲಾಗುತ್ತದೆ. ಇದು ಮಗುವಿನ ಮತ್ತು ತಾಯಿಯ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಲು ನೆರವಾಗುತ್ತದೆ. (ದಯವಿಟ್ಟು ವೈದ್ಯರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ).`;
        } else if (language === 'hi') {
          reply = `OGTT (ओरल ग्लूकोज टॉलरेंस टेस्ट) गर्भावस्था में रक्त शर्करा (शुगर) के स्तर की जांच के लिए किया जाता है। यह आमतौर पर 24 से 28 सप्ताह के बीच किया जाता है ताकि गर्भावधि मधुमेह की समय पर पहचान हो सके। (यह केवल सामान्य जानकारी है; कृपया डॉक्टर से परामर्श लें)।`;
        } else {
          reply = `The Oral Glucose Tolerance Test (OGTT) measures how the mother's body processes glucose during pregnancy. It is routinely conducted between 24 and 28 weeks to check for Gestational Diabetes. Proper nutrition and medical monitoring help keep both mother and baby healthy.`;
        }
      } else if (lower.includes('checklist') || lower.includes('ಪರಿಶೀಲನಾ') || lower.includes('आशा')) {
        reply = `ASHA Home Visit Protocol for ${activePatient?.name} (${activePatient?.currentPregnancy?.gestationalAgeWeeks ? `${activePatient.currentPregnancy.gestationalAgeWeeks}w` : activePatient?.currentPregnancy?.currentStage}):\n1. Inquire regarding daily compliance with Tab IFA and Tab Calcium.\n2. Inquire about any red-flag symptoms: headache, blurring of vision, epigastric pain, or decreased fetal movements.\n3. Request physical copy of: ${activePatient?.missingInformation?.[0]?.title || 'Pending hospital slips'}.\n4. Remind family regarding transport arrangement to ${activePatient?.phc}.`;
      } else if (lower.includes('reminder') || lower.includes('ಸಂದೇಶ') || lower.includes('संदेश')) {
        if (language === 'kn') {
          reply = `SMS Template (ಕನ್ನಡ):\n"ನಮಸ್ತೆ ${activePatient?.name}, ನಿಮ್ಮ ಮುಂದಿನ ಆಂಟಿನಾಟಲ್ ತಪಾಸಣೆ ದಿನಾಂಕ ಸಮೀಪಿಸುತ್ತಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ತಾಯಿ ಕಾರ್ಡ್ ಮತ್ತು ಹಿಂದಿನ ರಕ್ತ ಪರೀಕ್ಷಾ ವರದಿಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ${activePatient?.phc} ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ. - ನಿಮ್ಮ ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ${activePatient?.ashaWorker?.name}"`;
        } else if (language === 'hi') {
          reply = `SMS Template (हिंदी):\n"नमस्ते ${activePatient?.name} जी, आपकी आगामी प्रसव पूर्व जांच का समय आ गया है। कृपया अपना जच्चा-बच्चा (ताई) कार्ड एवं पिछली रक्त जांच रिपोर्ट साथ लेकर ${activePatient?.phc} आएं। - आपकी आशा कार्यकर्ता ${activePatient?.ashaWorker?.name}"`;
        } else {
          reply = `SMS Template (English):\n"Hello ${activePatient?.name}, this is a gentle reminder for your upcoming antenatal check-up. Please bring your Taayi card and all previous laboratory reports to ${activePatient?.phc}. - ASHA Coordinator ${activePatient?.ashaWorker?.name}"`;
        }
      } else {
        reply = `Thank you. I have indexed your inquiry regarding ${activePatient?.name}. All documented reports for this patient can be inspected in the Documents and Visual Analytics tabs. Clinicians retain sole authority for all diagnostic or therapeutic choices.`;
      }

      setMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 600);
  };

  const handleCopyText = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-botanical flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 text-sm">ASHA / Patient Assistant</h3>
              <Badge variant="sage" size="sm">Assistive</Badge>
            </div>
            <p className="text-[11px] text-slate-500">Multilingual Continuity Helper</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Language Switcher Bar */}
      <div className="px-4 py-2 bg-sage-50 border-b border-sage-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-600 font-medium">
          <Languages className="w-3.5 h-3.5 text-botanical" />
          <span>Language:</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिंदी' },
            { id: 'kn', label: 'ಕನ್ನಡ' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                language === l.id
                  ? 'bg-botanical text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Strict Safety Guardrail Notice */}
      <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="leading-tight">
          Non-diagnostic educational assistant. Does not prescribe or alter medications.
        </span>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={idx}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  isAssistant
                    ? 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60'
                    : 'bg-botanical text-white rounded-tr-sm shadow-xs'
                }`}
              >
                {msg.text}
              </div>

              {isAssistant && msg.text.includes('\n') && (
                <button
                  onClick={() => handleCopyText(msg.text, idx)}
                  className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 hover:text-botanical"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy Text'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-slate-50 border-t border-slate-100">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Suggested Queries ({activePatient?.name})
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts[language]?.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] text-slate-700 bg-white hover:bg-sage-50 border border-slate-200 hover:border-sage-300 px-2 py-1 rounded-md text-left transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask about ${activePatient?.name || 'patient'} records...`}
          className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-botanical"
        />
        <Button
          size="sm"
          variant="primary"
          onClick={() => handleSend()}
          icon={Send}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
