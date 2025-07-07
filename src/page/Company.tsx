import { AllAcctLists } from "../mock/acctList";

const Company = () => {
  return (
    <div>
      Company
      <pre>{JSON.stringify(AllAcctLists, null, 2)}</pre>
    </div>
  );
};
export default Company;
