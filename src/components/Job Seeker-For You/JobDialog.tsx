import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import Button from "../common/Button";
import { CheckCircle, XCircle } from "lucide-react";
import { CV } from "../../types/CV";

type DialogType = "apply" | "report";

interface JobDialogProps {
  type: DialogType | null;
  cvs: CV[];
  onClose: () => void;
  onApplySubmit: (cvId: number) => void;
  onReportSubmit: (message: string) => void;
}

const JobDialog = ({
  type,
  cvs,
  onClose,
  onApplySubmit,
  onReportSubmit,
}: JobDialogProps) => {
  const [selectedCVId, setSelectedCVId] = useState<number | null>(null);
  const [reportMessage, setReportMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsValid(
      type === "apply" ? !!selectedCVId : reportMessage.trim().length >= 10
    );
  }, [selectedCVId, reportMessage, type]);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [type]);

  const handleSubmit = () => {
    if (!type || !isValid) return;
    if (type === "apply") onApplySubmit(selectedCVId!);
    else onReportSubmit(reportMessage);
    setIsSubmitted(true);
    setReportMessage("");
    setSelectedCVId(null);
  };

  if (!type) return null;

  return (
    <Dialog open={!!type} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl bg-white rounded-3xl shadow-xl min-h-[300px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-heading"
        >
          <div className="p-8 max-h-[80vh]">
            {isSubmitted ? (
              <div className="text-center py-8 min-h-[200px] flex flex-col justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {type === "apply"
                    ? "Application Submitted!"
                    : "Report Submitted!"}
                </h3>
                <p className="text-gray-600">
                  {type === "apply"
                    ? "Your application has been successfully submitted."
                    : "Thank you for your report. We will review it shortly."}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold" id="dialog-heading">
                    {type === "apply" ? "Apply with CV" : "Report Job"}
                  </h2>
                  <button
                    onClick={onClose}
                    className="hover:bg-gray-200 rounded-full p-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>

                {type === "apply" ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">Select a CV to apply:</p>
                    <div className="grid gap-3">
                      {cvs.slice(0, 5).map((cv) => (
                        <label
                          key={cv.id}
                          className="flex items-center p-3 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
                        >
                          <input
                            type="radio"
                            name="cv"
                            value={cv.name}
                            checked={selectedCVId === cv.id}
                            onChange={() => setSelectedCVId(cv.id)}
                            className="mr-3 w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium">{cv.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">
                      Please describe the issue:
                    </p>
                    <textarea
                      value={reportMessage}
                      onChange={(e) => setReportMessage(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Please provide detailed information about the issue..."
                      rows={6}
                    />
                    <p className="text-sm text-gray-500">
                      Minimum 10 characters required
                    </p>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    variant={
                      isValid
                        ? type === "apply"
                          ? "primary"
                          : "report"
                        : "outline"
                    }
                    className={"!w-auto"}
                  >
                    {type === "apply" ? "Submit Application" : "Submit Report"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default JobDialog;
