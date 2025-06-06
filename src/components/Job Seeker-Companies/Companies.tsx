import CompanyList from "./CompanyList";
import FilterSection from "../Filters/FilterSection";
import useStore from "../../stores/globalStore";

const Companies = () => {
  const useCompanies = useStore.useCompaniesTabCompanies;
  const useHasMore = useStore.useCompaniesTabHasMore;
  const useIsLoading = useStore.useCompaniesTabIsCompaniesLoading;
  const useFetchCompanies = useStore.useCompaniesTabFetchCompanies;
  const useFilters = useStore.useCompaniesTabFilters;
  const useIndustryOptions = useStore.useSharedEntitiesIndustryOptions;
  const useSetFilters = useStore.useCompaniesTabSetFilters;
  const useFetchCompanyIndustries =
    useStore.useCompaniesTabFetchCompanyIndustries;
  const useFetchCompanyLocations =
    useStore.useCompaniesTabFetchCompanyLocations;
    

  return (
    <div className="grid grid-cols-[1fr_2.2fr] gap-8">
      <FilterSection
        useFilters={useFilters}
        useIndustryOptions={useIndustryOptions}
        useSetFilters={useSetFilters}
      />
      <div className="bg-white space-y-6 p-6 rounded-3xl h-[700px] overflow-y-auto hide-scrollbar max-w-4xl border-2 border-gray-200">
        <CompanyList
          useCompanies={useCompanies}
          useFetchCompanies={useFetchCompanies}
          useHasMore={useHasMore}
          useIsLoading={useIsLoading}
          useFetchCompanyIndustries={useFetchCompanyIndustries}
          useFetchCompanyLocations={useFetchCompanyLocations}
        />
      </div>
    </div>
  );
};

export default Companies;
