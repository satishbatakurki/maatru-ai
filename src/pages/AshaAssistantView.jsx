import React, { useState } from 'react';
import {
  Bot,
  Send,
  Languages,
  ShieldCheck,
  CheckCircle2,
  FileQuestion,
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const AshaAssistantView = ({ activePatient }) => {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Namaste! I am the MaatruAI Care Assistant. I support ASHA workers, care coordinators, and mothers with document collection, test explanations in plain language, and appointment reminders for ${activePatient?.name || 'the patient'}.\n\nIMPORTANT SAFETY NOTICE: I provide administrative and educational support only. I do not diagnose diseases, recommend medical treatments, prescribe medications, or calculate clinical risk scores.`
    }
  ]);
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const quickPrompts = {
    en: [
      "What documents are still missing for this patient?",
      "Generate an ASHA home-visit checklist",
      "Explain the 75g OGTT test in simple terms",
      "Draft a reminder message for the mother",
      "Explain why Rh-Negative status requires an Anti-D injection"
    ],
    hi: [
      "इस मरीज के कौन से आवश्यक दस्तावेज़ अभी भी गायब हैं?",
      "आशा कार्यकर्ता के लिए गृह-भेंट चेकलिस्ट बनाएं",
      "75g OGTT टेस्ट का क्या उद्देश्य है, सरल भाषा में बताएं",
      "आगामी अस्पताल जांच के लिए माता को भेजने हेतु संदेश तैयार करें",
      "Rh-नेगेटिव रक्त समूह में Anti-D इंजेक्शन क्यों आवश्यक है?"
    ],
    kn: [
      "ಈ ರೋಗಿಗೆ ಯಾವ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಇನ್ನೂ ಕಾಣೆಯಾಗಿವೆ?",
      "ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯ ಮನೆ ಭೇಟಿ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ರಚಿಸಿ",
      "75g OGTT ಪರೀಕ್ಷೆಯ ಮಹತ್ವವನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸಿ",
      "ಮುಂದಿನ ಆಸ್ಪತ್ರೆ ಭೇಟಿಗೆ ತಾಯಿಗೆ ಜ್ಞಾಪನೆ ಸಂದೇಶ ರಚಿಸಿ",
      "Rh-ನೆಗೆಟಿವ್ ರಕ್ತದ ಗುಂಪಿಗೆ Anti-D ಇಂಜೆಕ್ಷನ್ ಏಕೆ ಮುಖ್ಯ?"
    ]
  };

  const handleSend = (userText) => {
    const text = userText || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes('missing') || lower.includes('ದಾಖಲೆ') || lower.includes('गायब')) {
        const items = activePatient?.missingInformation?.map(m => `• ${m.title} (${m.category})\n  Recommended Window: ${m.recommendedWindow}\n  Action: ${m.suggestedAction}`).join('\n\n') || "No missing items recorded.";
        reply = `DOCUMENT COLLECTION CHECKLIST FOR ${activePatient?.name?.toUpperCase()}:\n\n${items}\n\nProtocol for ASHA (${activePatient?.ashaWorker?.name}): Please inquire if the patient holds the physical paper receipt during your home check-in and photograph it using the MaatruAI mobile upload tool.`;
      } else if (lower.includes('anti-d') || lower.includes('rh') || lower.includes('ಇಂಜೆಕ್ಷನ್') || lower.includes('इंजेक्शन')) {
        if (language === 'kn') {
          reply = `Anti-D ಇಂಜೆಕ್ಷನ್ ಬಗ್ಗೆ ಮಾಹಿತಿ:\nತಾಯಿಯ ರಕ್ತದ ಗುಂಪು Rh-Negative (ಉದಾ: O -ve) ಆಗಿದ್ದು, ಮಗುವಿನ ರಕ್ತ Rh-Positive ಆಗಿರುವ ಸಾಧ್ಯತೆಯಿದ್ದಾಗ, ತಾಯಿಯ ದೇಹವು ಮಗುವಿನ ವಿರುದ್ಧ ಪ್ರತಿಕಾಯಗಳನ್ನು (antibodies) ಉತ್ಪಾದಿಸದಂತೆ ತಡೆಯಲು 28ನೇ ವಾರದಲ್ಲಿ Anti-D ಇಂಜೆಕ್ಷನ್ ನೀಡಲಾಗುತ್ತದೆ. ಇದು ಮುಂದಿನ ಗರ್ಭಧಾರಣೆಯ ಸುರಕ್ಷತೆಗೂ ಅತೀ ಮುಖ್ಯವಾಗಿದೆ. (ಇದು ಸಾಮಾನ್ಯ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ; ದಯವಿಟ್ಟು ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯಿರಿ).`;
        } else if (language === 'hi') {
          reply = `Anti-D इंजेक्शन के बारे में जानकारी:\nजब माता का रक्त समूह Rh-नेगेटिव (जैसे O -ve) होता है और शिशु के Rh-पॉजिटिव होने की संभावना होती है, तो माता के शरीर में शिशु के रक्त के विरुद्ध एंटीबॉडी बनने से रोकने के लिए 28वें सप्ताह में Anti-D इम्युनोग्लोबुलिन इंजेक्शन दिया जाता है। यह सुरक्षित प्रसव एवं भविष्य के गर्भधारण के लिए आवश्यक है। (यह केवल चिकित्सीय शिक्षा हेतु है; डॉक्टर के निर्देश का पालन करें)।`;
        } else {
          reply = `About Anti-D Immunoglobulin:\nWhen a mother has Rh-Negative blood (e.g. O -ve) and may carry an Rh-Positive fetus, an Anti-D injection is routinely administered around 28 weeks of gestation. This prevents maternal alloimmunization (antibodies forming against fetal red blood cells) and protects current and future pregnancies. Always consult the examining doctor for administration confirmation.`;
        }
      } else if (lower.includes('ogtt') || lower.includes('glucose') || lower.includes('sugar') || lower.includes('ಪರೀಕ್ಷೆ')) {
        reply = `The Oral Glucose Tolerance Test (OGTT) is performed between 24 and 28 weeks of pregnancy. The mother drinks a 75g glucose drink, and blood samples are tested fasting, at 1 hour, and at 2 hours. This helps identify gestational diabetes early so that dietary management can ensure normal fetal growth and safe delivery.`;
      } else if (lower.includes('checklist') || lower.includes('ಪರಿಶೀಲನಾ') || lower.includes('चेकलिस्ट')) {
        reply = `ASHA HOME-VISIT CHECKLIST (${activePatient?.name} - ${activePatient?.currentPregnancy?.gestationalAgeWeeks ? `${activePatient.currentPregnancy.gestationalAgeWeeks}w` : activePatient?.currentPregnancy?.currentStage}):\n\n1. Inquire: Is mother taking 1 IFA tablet daily at night and Calcium twice daily?\n2. Check: Any signs of headache, sudden facial swelling, or vision changes?\n3. Document Collection: Collect copy of ${activePatient?.missingInformation?.[0]?.title || 'pending lab slips'}.\n4. Logistics: Confirm transport plan and companion for next visit at ${activePatient?.phc}.\n5. Emergency: Remind family of 108 ambulance contact.`;
      } else if (lower.includes('reminder') || lower.includes('ಸಂದೇಶ') || lower.includes('संदेश')) {
        reply = `SMS Template (${language.toUpperCase()}):\n"Dear ${activePatient?.name}, this is a reminder from your ASHA worker (${activePatient?.ashaWorker?.name}). Your next checkup at ${activePatient?.phc} is scheduled. Please carry your Taayi Card and recent blood test reports. For any concerns, call ${activePatient?.ashaWorker?.phone}."`;
      } else {
        reply = `Inquiry recorded for ${activePatient?.name}. All documented records, vitals, and laboratory parameters are securely accessible in the Patient Journey and Documents sections. As an assistive tool, MaatruAI strictly defers all clinical diagnoses and treatment decisions to your healthcare provider.`;
      }

      setMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 500);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-botanical text-white flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">ASHA & Patient Care Assistant</h2>
              <Badge variant="sage" size="sm">Multilingual</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Assisting with document collection, plain-language test explanations, and maternal follow-up reminders.
            </p>
          </div>
        </div>

        {/* Language switch */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <Languages className="w-3.5 h-3.5 text-botanical ml-1" />
          {[
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिंदी' },
            { id: 'kn', label: 'ಕನ್ನಡ' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                language === l.id
                  ? 'bg-botanical text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Strict Safety Boundary:</strong> This assistant provides administrative coordination and non-diagnostic educational information. It does not prescribe medications or diagnose medical conditions.
        </span>
      </div>

      {/* Chat Display Box */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-card flex flex-col h-[520px] overflow-hidden">
        {/* Messages scroll */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div
                key={index}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isBot
                      ? 'bg-slate-50 text-slate-800 rounded-tl-sm border border-slate-200/70 shadow-xs'
                      : 'bg-botanical text-white rounded-tr-sm shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {isBot && msg.text.includes('\n') && (
                  <button
                    onClick={() => handleCopy(msg.text, index)}
                    className="mt-1.5 flex items-center gap-1 text-xs text-slate-500 hover:text-botanical transition-colors"
                  >
                    {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === index ? 'Copied to clipboard' : 'Copy checklist'}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Suggested Inquiries ({activePatient?.name})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts[language]?.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-white text-slate-700 hover:bg-sage-50 border border-slate-200 hover:border-sage-300 px-3 py-1.5 rounded-lg text-left transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input form */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask about ${activePatient?.name || 'patient'} records, missing documents, or reminders...`}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-botanical"
          />
          <Button
            variant="primary"
            onClick={() => handleSend()}
            icon={Send}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
