"use client";
import { boolean } from "zod";
import { formatDistanceToNow } from "date-fns"
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";


export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  })
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workflows"
    />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();


  if (workflows.data.items.length === 0) {
    return <WorkflowsEmpty />
  }

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowsItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  )
}




export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter()
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      }
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="WorkFlows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel={"New Workflow"}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>

  )
}


export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isPending}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />

  )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<><WorkflowsSearch /></>}
      pagination={<><WorkflowsPagination /></>}
    >
      {children}
    </EntityContainer>
  )
}

export const WorkflowsLoading = () => {
  return (
    <LoadingView message="Loading workflows...." />
  )
}

export const WorkflowsError = () => {
  return (
    <ErrorView message="Failed to load workflows. Please try again." />
  )
}


export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => { handleError(error); }
    })
  }


  return (
    <>
      {modal}
      <EmptyView onNew={handleCreate} message={"You have not created any workflows yet. Get started by creating a new one."} />
    </>
  )
}


export const WorkflowsItem = ({
  data
}: { data: Workflow }) => {
const {mutateAsync: removeWorkflow, isPending: isRemoving} = useRemoveWorkflow();
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}{" "}
          &bull; Created {" "}
          {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}

        </>
      }
      image={<div className="size-8 flex items-center justify-center">
        <WorkflowIcon />
      </div>}
      onRemove={() => removeWorkflow({ id: data.id })}
      isRemoving={isRemoving}
    />
  )

}