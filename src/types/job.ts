import { Review } from "./review";

export interface Job {
    id: number;
    title: string;
    country: string;
    city?: string;
    datePosted: string;
    companyData: {
        id: number
        name: string;
        rating: number;
        image?: string;
    }
}

export interface JobDetails {
    title: string;
    country: string;
    city: string;
    datePosted: string;
    applicantsCount: number;
    matchingSkillsCount: number;
    jobSkillsCount: number;
    remote: boolean;
    companyData: {
        image?: string;
        name: string;
        rating: number;
        overview: string;
        size: number;
        foundedIn: number;
        type: string;
        industriesCount: number;
    };
    companyReviews: Review[];
}

export interface ForYouPageFilters {
    datePosted: string;
    companyRating: string;
    industry: string;
    country: string;
    city: string;
    remote: boolean;
}