import { CombinedState } from '../storeTypes.ts';
import { StateCreator } from 'zustand';
import { Experience, Education, Skill, SeekerProfileInfo, UserCredentials } from '../../types/profile.ts';
import { CV } from '../../types/profile.ts';
import { Review } from '../../types/review.ts';
import { mockEducation, mockExperience, mockCVs, mockReviews, mockSkills } from '../../mock data/seekerProfile.ts';
import { mockSeekerProfileInfo } from '../../mock data/seekerProfile.ts';
import config from "../../../config/config.ts";
import { formatDistanceToNow } from 'date-fns';
const { paginationLimit } = config;
let cnt = 100;

export interface SeekerProfileSlice {
    seekerProfileInfo: SeekerProfileInfo;
    seekerProfileUpdateInfo: (profile: SeekerProfileInfo) => Promise<void>;
    seekerProfileFetchInfo: () => Promise<void>;

    seekerCredentials: UserCredentials;
    seekerSetCredentials: (credentials: UserCredentials) => void;

    seekerProfileExperience: Experience[];
    seekerProfileFetchExperience: () => Promise<void>;
    seekerProfileAddExperience: (experience: Experience) => Promise<void>;
    seekerProfileUpdateExperience: (experience: Experience) => Promise<void>;
    seekerProfileRemoveExperience: (id: number) => Promise<void>;

    seekerProfileEducation: Education[];
    seekerProfileFetchEducation: () => Promise<void>;
    seekerProfileAddEducation: (education: Education) => Promise<void>;
    seekerProfileUpdateEducation: (education: Education) => Promise<void>;
    seekerProfileRemoveEducation: (id: number) => Promise<void>;

    seekerProfileSkills: Skill[];
    seekerProfileFetchSkills: () => Promise<void>;
    seekerProfileAddSkill: (skill: Skill) => Promise<void>;
    seekerProfileRemoveSkill: (id: number) => Promise<void>;

    seekerProfileCVs: CV[];
    seekerProfileFetchCVs: () => Promise<void>;
    seekerProfileAddCV: (cv: CV) => Promise<void>;
    seekerProfileRemoveCV: (id: number) => Promise<void>;
    seekerProfileGetCV: (id: number) => Promise<void>;

    seekerProfileReviews: Review[];
    seekerProfileReviewsHasMore: boolean;
    seekerProfileReviewsPage: number;
    seekerProfileReviewsIsLoading: boolean;
    seekerProfileFetchReviews: () => Promise<void>;
    seekerProfileUpdateReview: (review: Review) => Promise<void>;
    seekerProfileRemoveReview: (id: number) => Promise<void>;
}

export const createSeekerProfileSlice: StateCreator<CombinedState, [], [], SeekerProfileSlice> = (set, get) => ({
    seekerProfileInfo: {
        name: '',
        country: '',
        city: '',
        phone: '',
        gender: '',
        birthdate: '',
    },
    seekerCredentials: {
        id: '1',
        email: 'boody@gmail.com',
        password: '12345678'
    },
    seekerProfileExperience: [],
    seekerProfileEducation: [],
    seekerProfileSkills: [],
    seekerProfileCVs: [],
    seekerProfileReviews: [],
    seekerProfileReviewsHasMore: true,
    seekerProfileReviewsPage: 1,
    seekerProfileReviewsIsLoading: false,

    seekerProfileFetchInfo: async () => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({ seekerProfileInfo: { ...mockSeekerProfileInfo } });
                resolve();
            }, 1000);
        });
    },

    seekerProfileUpdateInfo: async (profile) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({
                    seekerProfileInfo: { ...profile },
                    userName: profile.name,
                    userImage: profile.image
                });
                resolve();
            }, 1000);
        });
    },

    seekerSetCredentials: (credentials: UserCredentials) => set((state) => ({
        seekerCredentials: credentials, // Replace the entire credentials object
    })),

    seekerProfileFetchExperience: async () => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({ seekerProfileExperience: [...mockExperience] });
                resolve();
            }, 1000);
        });
    },

    seekerProfileAddExperience: async (experience) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileExperience: [{ ...experience, id: cnt++ }, ...state.seekerProfileExperience]
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileUpdateExperience: async (experience) => {
        console.log(experience);

        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileExperience: state.seekerProfileExperience.map((exp) =>
                        exp.id === experience.id ? { ...exp, ...experience } : { ...exp }
                    )
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileRemoveExperience: async (id) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileExperience: state.seekerProfileExperience.filter((exp) => exp.id !== id)
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileFetchEducation: async () => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({ seekerProfileEducation: [...mockEducation] });
                resolve();
            }, 1000);
        });
    },

    seekerProfileAddEducation: async (education) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileEducation: [{ ...education, id: cnt++ }, ...state.seekerProfileEducation]
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileUpdateEducation: async (education) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileEducation: state.seekerProfileEducation.map((edu) =>
                        edu.id === education.id ? { ...edu, ...education } : { ...edu }
                    )
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileRemoveEducation: async (id) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileEducation: state.seekerProfileEducation.filter((edu) => edu.id !== id)
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileFetchSkills: async () => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({ seekerProfileSkills: [...mockSkills] });
                resolve();
            }, 1000);
        });
    },

    seekerProfileAddSkill: async (skill) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileSkills: [{ ...skill, id: cnt++ }, ...state.seekerProfileSkills,]
                }))
                resolve();
            }, 1000);
        });
    },

    seekerProfileRemoveSkill: async (id) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileSkills: state.seekerProfileSkills.filter((skill) => skill.id !== id)
                }))
                resolve();
            }, 1000);
        });
    },

    seekerProfileFetchCVs: async () => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set({ seekerProfileCVs: [...mockCVs] });
                resolve();
            }, 1000);
        });
    },

    seekerProfileAddCV: async (cv) => {
        const { seekerProfileCVs } = get();
        if (seekerProfileCVs.length === 5) {
            const err: Error & { status?: number } = new Error('You can only have 5 CVs');
            err.status = 409;
            throw err;
        }

        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileCVs: [{ ...cv, id: cnt++ }, ...state.seekerProfileCVs]
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileRemoveCV: async (id) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileCVs: state.seekerProfileCVs.filter((cv) => cv.id !== id)
                }));
                resolve();
            }, 1000);
        });
    },

    // will be implemented to request the CV file from the API
    seekerProfileGetCV: async (id) => {
    },

    seekerProfileFetchReviews: async () => {
        const { seekerProfileReviewsHasMore, seekerProfileReviewsIsLoading } = get();
        if (!seekerProfileReviewsHasMore || seekerProfileReviewsIsLoading) return;

        set({ seekerProfileReviewsIsLoading: true });

        // mock API call
        await new Promise<void>((resolve) => setTimeout(() => {
            set((state) => {
                const startIndex = (state.seekerProfileReviewsPage - 1) * paginationLimit;
                const endIndex = startIndex + paginationLimit;
                const newReviews = mockReviews.slice(startIndex, endIndex).map((review) => ({
                    ...review,
                    createdAt: formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })
                }));

                return {
                    seekerProfileReviews: [...state.seekerProfileReviews, ...newReviews],
                    seekerProfileReviewsHasMore: endIndex < mockReviews.length,
                    seekerProfileReviewsPage: state.seekerProfileReviewsPage + 1,
                    seekerProfileReviewsIsLoading: false
                }
            });
            resolve();
        }, 1000));
    },

    seekerProfileUpdateReview: async (review) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileEducation: state.seekerProfileEducation.map((rev) =>
                        rev.id === review.id ? { ...rev, ...review } : { ...rev }
                    )
                }));
                resolve();
            }, 1000);
        });
    },

    seekerProfileRemoveReview: async (id) => {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                set((state) => ({
                    seekerProfileReviews: state.seekerProfileReviews.filter((review) => review.id !== id)
                }));
                resolve();
            }, 1000);
        });
    },

});