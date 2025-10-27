import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * Hook to fetch all workflows using suspense
 *
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

/**
 * Hook to create a new workflow
 */

export const useCreateWorkflow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess(data, variables, onMutateResult, context) {
        toast.success(`Workflow  "${data.name}" created successfully`);

        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError(error, variables, onMutateResult, context) {
        toast.error(error.message);
      },
    })
  );
};

/**
 * Hok to update a workflow name
 * 
 */

export const useUpdateWorkflowName = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess(data, variables, onMutateResult, context) {
        toast.success(`Workflow "${data.name}" updated successfully`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
      onError(error, variables, onMutateResult, context) {
        toast.error(error.message);
      },
    })
  );
};


/**
 * Hook t remove a workflow
 *
 */

export const useRemoveWorkflow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess(data, variables, onMutateResult, context) {
        toast.success(`Workflow "${data.name}" removed successfully`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
      onError(error, variables, onMutateResult, context) {
        toast.error(error.message);
      },
    })
  );
};


/**
 * Hook to fetch a single workflow using suspense
 */


export const useSuspenseWorkflow = (id:string)=>{
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}))
}