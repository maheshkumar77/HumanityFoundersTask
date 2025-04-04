import { useState } from "react";
import { FiMail, FiPhone, FiTrash2, FiEdit } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function FollowUps() {
  const [aiManaged, setAiManaged] = useState(false);
  const [activeTab, setActiveTab] = useState("customer");
  const [steps, setSteps] = useState([
    {
      id: 1,
      method: "email",
      duration: "24",
      message: "Thank you for your referral! Here's your discount code: REFER10",
    },
    {
      id: 2,
      method: "sms",
      duration: "72",
      message: "Just checking in! How's your experience with our service?",
    },
  ]);
  const [editingStep, setEditingStep] = useState(null);

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      method: "email",
      duration: "",
      message: "",
    };
    setSteps([...steps, newStep]);
    setEditingStep(newStep.id);
  };

  const updateStep = (id, field, value) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const removeStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const saveStep = () => {
    setEditingStep(null);
  };

  const tabs = [
    { id: "customer", label: "Customer Follow Ups" },
    { id: "referred", label: "Referred Follow Ups" },
    { id: "global", label: "Global Strategy" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Follow-Up Automation
          </h1>
          <p className="text-gray-600 mt-2">
            Configure automated follow-ups for customers and referrals.
          </p>
        </motion.div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          {/* Tab Navigation */}
          <motion.div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* AI Toggle */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center space-x-3 mb-6 p-3 bg-blue-50 rounded-lg"
          >
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="ai-toggle"
                checked={aiManaged}
                onChange={() => setAiManaged(!aiManaged)}
                className="sr-only"
              />
              <motion.div
                layout
                className={`block w-12 h-6 rounded-full ${
                  aiManaged ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    aiManaged ? "translate-x-6" : ""
                  }`}
                />
              </motion.div>
            </div>
            <label htmlFor="ai-toggle" className="font-medium text-gray-700">
              AI-Managed Follow-Ups
            </label>
            {aiManaged && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                Active
              </motion.span>
            )}
          </motion.div>

          {/* Follow-Up Steps */}
          <AnimatePresence>
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-4 mb-4 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">
                    Step {steps.findIndex((s) => s.id === step.id) + 1}
                  </h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setEditingStep(editingStep === step.id ? null : step.id)
                      }
                      className="p-1 text-gray-500 hover:text-blue-600"
                    >
                      <FiEdit size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeStep(step.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </div>

                {editingStep === step.id ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Method
                      </label>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStep(step.id, "method", "email")}
                          className={`flex items-center px-3 py-2 rounded-lg ${
                            step.method === "email"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FiMail className="mr-2" />
                          Email
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStep(step.id, "method", "sms")}
                          className={`flex items-center px-3 py-2 rounded-lg ${
                            step.method === "sms"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FiPhone className="mr-2" />
                          SMS
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Wait Duration (hours)
                      </label>
                      <input
                        type="number"
                        value={step.duration}
                        onChange={(e) =>
                          updateStep(step.id, "duration", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="24"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        value={step.message}
                        onChange={(e) =>
                          updateStep(step.id, "message", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your message..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveStep}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center text-gray-600">
                      {step.method === "email" ? (
                        <FiMail className="mr-2" />
                      ) : (
                        <FiPhone className="mr-2" />
                      )}
                      <span className="capitalize">{step.method}</span>
                      <span className="mx-2">•</span>
                      <span>{step.duration} hours after signup</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-800">{step.message}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Step Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addStep}
            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors mt-4"
          >
            <BsPlus className="mr-2" size={20} />
            <span>Add New Step</span>
          </motion.button>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Save Follow-Up Sequence
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}