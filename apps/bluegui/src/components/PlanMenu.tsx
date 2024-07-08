import Select from "react-select";
import { Plan } from "../types";

type PlansMenuProps = {
  selectedOption: any;
  setSelectedOption: any;
  setPlan: (c: Plan) => void;
  planMap: Map<string, Plan>;
  options: any;
};

export function PlansMenu({
  selectedOption,
  setSelectedOption,
  setPlan,
  planMap,
  options,
}: PlansMenuProps) {
  return (
    <div className="menu">
      <h3> Available Plans</h3>
      <Select
        defaultValue={selectedOption}
        onChange={(newValue) => {
          setSelectedOption(newValue);
          const c = planMap.get(newValue.value);
          setPlan(c);
        }}
        options={options}
      />
    </div>
  );
}
