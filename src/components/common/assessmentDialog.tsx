import { Dialog } from "@headlessui/react";
import { XCircle } from "lucide-react";
import Button from "../common/Button";
import useStore from "../../stores/globalStore";
import { useEffect, useState } from "react";



interface AssessmentDetails {
    assessmentId:number
    companyName: string;
    jobTitle: string;
    instructions: string;
    assessmentTime: string;
}

const AssessmentDialog = () => {
    const setAssessmentId=useStore.useSetSelectedAssessment();
    const isOpen = useStore.useAssessmentDialogIsOpen();
    const setIsOpen = useStore.useSetAssessmentDialogIsOpen();
    const selectedAssessmentId = useStore.useSelectedAssessmentId();
    const SeekerAssessmentData=useStore.useSeekerAssessmentsData();

    const [assessmentDetails, setAssessmentDetails] = useState<AssessmentDetails>({
        assessmentId:0,
        companyName: "",
        jobTitle: "",
        instructions: "",
        assessmentTime: "",
    });

    useEffect(() => {
        if (selectedAssessmentId) {
            // Fetch assessment details from the backend
           
            const data={assessmentId:-1,companyName:"",jobTitle:"",assessmentTime:"",instructions:"instructions"};
            for(let i=0;i<SeekerAssessmentData.length;i++){
                if(SeekerAssessmentData[i].assessmentId===selectedAssessmentId){
                    data.assessmentId=SeekerAssessmentData[i].assessmentId;
                    data.companyName=SeekerAssessmentData[i].companyName;
                    data.jobTitle=SeekerAssessmentData[i].jobTitle;
                    data.assessmentTime=SeekerAssessmentData[i].assessmentTime;
                    break;
                }
            }
        
                try{
                    setAssessmentDetails(data); // Update state with fetched data
                }catch(error){
                    console.error("Failed to fetch assessment details:", error);
                };
        }
    }, [selectedAssessmentId]);

   
    
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
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
                    <div className="p-8 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold" id="dialog-heading">
                                Assessment Instructions
                            </h2>
                            <button onClick={() => setIsOpen(false)}>
                                <XCircle className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={assessmentDetails.companyName}
                                    readOnly
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 outline-none"
                                />
                            </div>

                            {/* Job Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={assessmentDetails.jobTitle}
                                    readOnly
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 outline-none"
                                />
                            </div>

                            {/* Instructions */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Instructions</label>
                                <textarea
                                    name="instructions"
                                    value={assessmentDetails.instructions}
                                    readOnly
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 outline-none"
                                    rows={4}
                                />
                            </div>

                            {/* Assessment Time */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Assessment Time</label>
                                <input
                                    type="text"
                                    name="assessmentTime"
                                    value={assessmentDetails.assessmentTime}
                                    readOnly
                                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full"
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                className="rounded-full"
                                onClick={() => {
                                    // Handle starting the assessment
                                     setAssessmentId(selectedAssessmentId!)
                                }}
                            >
                                Start Assessment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default AssessmentDialog;