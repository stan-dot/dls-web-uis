import { Plan } from "../types";
import Form from "./Form";

type SinglePlanDisplayProps = {
  currentPlan: Plan;
};

export function SinglePlanDisplay({ currentPlan }: SinglePlanDisplayProps) {
  return (
    <div>
      <h2> Basic {currentPlan.name} plan UI</h2>
      <div className="description">
        Description: <span>{currentPlan.description}</span>
      </div>
      <br />
      <br />
      <Form schema={currentPlan.schema} />
    </div>
  );
}
