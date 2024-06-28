import { useReadContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useEffect, useState } from "react";

type SubscriptionType = {
  allowance: bigint;
  customer: string;
  description: string;
  exists: boolean;
  isActive: boolean;
  lastExecutionDate: bigint;
  name: string;
  payee: string;
  subscriptionPeriod: bigint;
};

type CreatedSubscriptionType = {
  allowance: bigint;
  creationDate: bigint;
  customer: string;
  description: string;
  name: string;
  payee: string;
};

const Dashboard = () => {
  const [createdSubscriptions, setCreatedSubscriptions] = useState<
    CreatedSubscriptionType[] | undefined
  >(undefined);

  const [subscriptions, setSubscriptions] = useState<
    SubscriptionType[] | undefined
  >(undefined);

  const result = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllCreatedSubscriptions",
    args: ["0x369B9F5963Ae40F06FA87E001De4BE4C39F21F2B"],
  });

  const result2 = useReadContract({
    abi: ABI_RECURRING_PAYMENTS,
    address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
    functionName: "getAllSubscribers",
    args: ["0x369B9F5963Ae40F06FA87E001De4BE4C39F21F2B"],
  });

  useEffect(() => {
    if (result.data) {
      setCreatedSubscriptions(result.data as CreatedSubscriptionType[]);
    }
  }, [result.data]);

  useEffect(() => {
    if (result2.data) {
      setSubscriptions(result2.data as SubscriptionType[]);
    }
  }, [result2.data]);

  const displayCreatedSubs = (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Allowance</th>
          <th>Customer</th>
          <th>Description</th>
          <th>Exists</th>
          <th>Is Active</th>
          <th>Last Execution Date</th>
          <th>Name</th>
          <th>Payee</th>
          <th>Subscription Period</th>
        </tr>
      </thead>
      <tbody>
        {createdSubscriptions?.map((subscription, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{subscription.allowance.toString()}</td>
            <td>{subscription.creationDate.toString()}</td>
            <td>{subscription.customer}</td>
            <td>{subscription.description}</td>
            <td>{subscription.name}</td>
            <td>{subscription.payee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const displayAllSubscribers = (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Allowance</th>
          <th>Customer</th>
          <th>Description</th>
          <th>Exists</th>
          <th>Is Active</th>
          <th>Last Execution Date</th>
          <th>Name</th>
          <th>Payee</th>
          <th>Subscription Period</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions?.map((subscription, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{subscription.allowance.toString()}</td>
            <td>{subscription.customer}</td>
            <td>{subscription.description}</td>
            <td>{subscription.exists.toString()}</td>
            <td>{subscription.isActive.toString()}</td>
            <td>{subscription.lastExecutionDate.toString()}</td>
            <td>{subscription.name}</td>
            <td>{subscription.payee}</td>
            <td>{subscription.subscriptionPeriod.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <button>Show Subscribed Things (User)</button>
      <button>Show Created Subscribtions (Merchant)</button>
      <br />
      <br />
      <div>{displayAllSubscribers}</div>
      <br />
      <br />
      <div>{displayCreatedSubs}</div>
    </div>
  );
};

export default Dashboard;
