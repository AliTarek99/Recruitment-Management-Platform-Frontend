import { StateCreator } from "zustand";
import { CombinedState } from "../storeTypes";
import { Interviews, DashboardInterviewsFilters, updateInterviewDate } from "../../types/recruiterDashboard";
import axios from 'axios';
import config from '../../../config/config.ts';
import RecruiterInterviews from "../../components/Recruiter Dashboard/RecruiterInterviews.tsx";
const API_BASE_URL = config.API_BASE_URL;

export interface RecruiterInterviewsSlice {
    recruiterJobTitles: string[];
    recruiterInterviewsData: Interviews[];
    recruiterInterviewsPage: number;
    recruiterInterviewsHasMore: boolean;
    recruiterInterviewsIsLoading: boolean;
    recruiterInterviewsFilters: DashboardInterviewsFilters;
    recruiterInterviewsUpateDate: updateInterviewDate;
    recruiterInterviewsSetUpateDate: (data: updateInterviewDate) => Promise<void>;
    recruiterInterviewsFetchData: () => Promise<void>;
    recruiterInterviewsSetFilters: (filters: Partial<RecruiterInterviewsSlice['recruiterInterviewsFilters']>) => void;
    resetAllData: () => void;
    recruiterInterviewsSetUpdateInterview: (jobId: number, candidateId: number, date: string, link: string) => Promise<void>;
}


export const createInterviewsSlice: StateCreator<
    CombinedState,
    [],
    [],
    RecruiterInterviewsSlice
    > = (set, get) => ({
    recruiterJobTitles: [],
    recruiterInterviewsData: [],
    recruiterInterviewsPage: 1,
    recruiterInterviewsHasMore: true,
    recruiterInterviewsIsLoading: false,
    recruiterInterviewsFilters: {
        sortByDate: "", // Sort by Date (Ascending/Descending)
        jobTitle: "",
    },
    recruiterInterviewsUpateDate: {
        jobId: 0,
        seekerId: 0,
        date: "",
    },
    resetAllData: () => {
        set({
            recruiterJobTitles: [],
            recruiterInterviewsData: [],
            recruiterInterviewsPage: 1,
            recruiterInterviewsHasMore: true,
            recruiterInterviewsIsLoading: false,
            recruiterInterviewsFilters: {
                sortByDate: "",
                jobTitle: "",
            }
        });
    },
    recruiterInterviewsSetUpateDate: async ({ jobId, seekerId, date}) => {
        try {
            set({ recruiterInvitationsIsLoading: true});

            await axios.put(`${API_BASE_URL}/interviews/${jobId}/${seekerId}`, {
                timestamp: date
            });
            set((state) => ({
                recruiterInterviewsData: state.recruiterInterviewsData.map(interview =>
                    interview.jobId === jobId && interview.userId === seekerId
                        ? { ...interview, date: date }
                        : interview
                ),
                recruiterInterviewsIsLoading: false,    
            }));
          
        } catch (error) {
            console.error("Failed to update interview date:", error);
        }
    },
    // Fetch data function
    recruiterInterviewsFetchData: async () => {
        const {
            recruiterInterviewsPage,
            recruiterInterviewsHasMore,
            recruiterInterviewsIsLoading,
            recruiterInterviewsFilters,
        } = get();

        // Return early if no more data or already loading
        if (!recruiterInterviewsHasMore || recruiterInterviewsIsLoading) return;

        set({ recruiterInterviewsIsLoading: true });

        try {
            // Make API call with filters and pagination
            const jobTitles = await axios.get(`${API_BASE_URL}/candidates/job-title-filter`)
            set(() => ({
                recruiterJobTitles: jobTitles.data.jobTitle
            }))
            const response = await axios.get(`${API_BASE_URL}/interviews`, {
                params: Object.fromEntries(
                    Object.entries({
                        page: recruiterInterviewsPage,
                        sort: recruiterInterviewsFilters.sortByDate,
                        title: recruiterInterviewsFilters.jobTitle
                    }).filter(([_, value]) => value !== '' && value !== undefined && value !== null)
                ),
            });
            const newRows = response.data.interviews;
            const hasMore = response.data.length > 0;
            set((state) => ({
                recruiterInterviewsData: [
                    ...state.recruiterInterviewsData, // Existing data after
                    ...newRows, // New data from API

                ],
                recruiterInterviewsHasMore: hasMore,
                recruiterInterviewsIsLoading: false,
                recruiterInterviewsPage: state.recruiterInterviewsPage + 1,
            }));    
        } catch (err) {
            set({ recruiterInterviewsIsLoading: false });
        }
    },

    // Set filters function
    recruiterInterviewsSetFilters: (filters) => {
        console.log(filters)
        set((state) => ({
            recruiterInterviewsFilters: { ...state.recruiterInterviewsFilters, ...filters },
            recruiterInterviewsData: [], // Reset data when filters change
            recruiterInterviewsPage: 1, // Reset pagination
            recruiterInterviewsHasMore: true, // Reset hasMore flag
        }));

        // Fetch new data after updating filters
        get().recruiterInterviewsFetchData();
        },
        recruiterInterviewsSetUpdateInterview: async ( jobId, seekerId, date, meetingLink ) => {
            try {
                set({ recruiterInterviewsIsLoading: true });
                const { recruiterInterviewsData } = get();

                // Find the current interview to compare values
                const currentInterview = recruiterInterviewsData.find(
                    interview => interview.jobId === jobId && interview.userId === seekerId
                );

                // Only make API call if either date or meetingLink has changed
                const dateChanged = currentInterview?.date !== date;
                const linkChanged = currentInterview?.meetingLink !== meetingLink;

                if (dateChanged || linkChanged) {
                    await axios.put(`${API_BASE_URL}/interviews/${jobId}/${seekerId}`, {
                        timestamp: date,
                        interviewLink: meetingLink
                    });

                    // Update state only if the API call was successful
                    set((state) => ({
                        recruiterInterviewsData: state.recruiterInterviewsData.map(interview =>
                            interview.jobId === jobId && interview.userId === seekerId
                                ? {
                                    ...interview,
                                    date: dateChanged ? date : interview.date,
                                    meetingLink: linkChanged ? meetingLink : interview.meetingLink
                                }
                                : interview
                        ),
                        recruiterInterviewsIsLoading: false,
                    }));
                } else {
                    // No changes needed, just set loading to false
                    set({ recruiterInterviewsIsLoading: false });
                }
            } catch (error) {
                console.error("Failed to update interview:", error);
                set({ recruiterInterviewsIsLoading: false });
            }
        }


});