import Dashboard from "../common/Dashboard";
import { ColumnDef } from "../common/Dashboard";
import {
  Invitations,
  InvitationsStatusFilterOptions,
  InvitationsSortByFilterOptions,
} from "../../types/companyDashboard";
import { useEffect } from "react";
import FilterDropdown from "../Filters/FilterDropdown";
import useStore from "../../stores/globalStore";

const CompanyInvitations = () => {
  const filters = useStore.useCompanyInvitationsFilters();
  const setFilters = useStore.useCompanyInvitationsSetFilters();
  const useData = useStore.useCompanyInvitationsData;
  const useHasMore = useStore.useCompanyInvitationsHasMore;
  const useIsLoading = useStore.useCompanyInvitationsIsLoading;
  const useFetchData = useStore.useCompanyInvitationsFetchData;
  const fetchData = useFetchData();
  const clear = useStore.useCompanyInvitationsTabClear();


  useEffect(() => {
    clear();
   fetchData();

   return clear;
}, []);

  const columns: ColumnDef<Invitations>[] = [
    {
      key: "department",
      header: "Department",
    },
    {
      key: "recruiter",
      header: "Recruiter",
    },
    {
      key: "dateSent",
      header: "Date Sent",
      render: (row) => {
          const deadline = new Date(row.dateSent);

          const formattedDate = deadline.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          });

          const formattedTime = deadline.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          });

          return (
              <div className="flex flex-col">
                  <span>{formattedDate}</span>
                  <span className="text-xs text-gray-500">
                      {formattedTime}
                  </span>
              </div>
          );
      }
    },
    {
      key: "deadline",
      header: "Deadline",
      render: (row) => {
          const deadline = new Date(row.deadline);

          const formattedDate = deadline.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          });

          const formattedTime = deadline.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          });

          return (
              <div className="flex flex-col">
                  <span>{formattedDate}</span>
                  <span className="text-xs text-gray-500">
                      {formattedTime}
                  </span>
              </div>
          );
      }
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={
            new Date(row.deadline) > new Date() && row.status === "Pending"
              ? "text-yellow-600"
              : row.status === "Accepted"
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {new Date(row.deadline) < new Date() && row.status === "Pending" ? "Expired" : row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="h-[700px] bg-white p-4 rounded-3xl border-2 border-gray-200 shadow">
      <div className="flex justify-between items-center mb-8">
        <h1 className="px-6 py-2 text-3xl font-bold">Invitations</h1>
        <div className="flex items-center py-4 px-6 space-x-20 flex-nowrap z-20">
            <FilterDropdown
                label="Status"
                options={InvitationsStatusFilterOptions}
                selectedValue={filters.status}
                onSelect={(value) => setFilters({ status: value })}
            />

            <FilterDropdown
                label="Sort By"
                options={InvitationsSortByFilterOptions}
                selectedValue={filters.sortBy}
                onSelect={(value) => setFilters({ sortBy: value })}
            />
        </div>
      </div>
      <div className="overflow-y-auto h-[580px]">
        <Dashboard
            columns={columns}
            useData={useData}
            useHasMore={useHasMore}
            useIsLoading={useIsLoading}
            useFetchData={useFetchData}
        />
      </div>
    </div>
  );
};
export default CompanyInvitations;