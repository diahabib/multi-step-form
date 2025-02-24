import "./style.css";
import { FormData } from "../../types/types";
import { useEffect, useState } from "react";
const Summary = ({ formData }: { formData: FormData }) => {
  const isYearly = formData.selectedPlan.billingOption === "yearly";
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const addonsTotal = formData.selectedAddOns.reduce(
      (acc, addon) => acc + addon.price,
      0
    );

    const planPrice = isYearly
      ? formData.selectedPlan.yearlyPrice ?? 0
      : formData.selectedPlan.monthlyPrice ?? 0;

    setTotal(planPrice + addonsTotal);
  }, [formData.selectedAddOns, formData.selectedPlan, isYearly]);

  return (
    <div className="text-neutral-cool-gray mb-4 p-4 pt-8 ps-10 lg:ps-8">
      <h1 className="font-700 text-2xl lg:text-3xl text-primary-marine-blue">
        Finishing up
      </h1>
      <p className="mt-3 text-neutral-cool-gray">
        Double-check everything looks OK before confirming.
      </p>
      <div className="mt-4 md:mt-8 gap-3s flex flex-col grow-1 bg-neutral-alabaster">
        <div
          className="flex justify-between text-primary-marine-blue py-3 px-4 md 
          "
        >
          <div className="text-start capitalize">
            <h3 className=" font-bold text-base">
              {formData.selectedPlan.plan} (
              {formData.selectedPlan.billingOption})
            </h3>
            <a
              href="#"
              className="underline text-neutral-cool-gray underline-offset-1 decoration-2"
            >
              Change
            </a>
          </div>
          <p className="text-sm self-center font-bold">
            $
            {isYearly
              ? formData.selectedPlan.yearlyPrice
              : formData.selectedPlan.monthlyPrice}
            /{isYearly ? "yr" : "mo"}
          </p>
        </div>
        <hr className="w-11/12 m-auto" />
        {formData.selectedAddOns.map((add_on) => (
          <div
            key={add_on.title + add_on.price}
            className={`flex justify-between grow gap-4 py-4 p-4  
              `}
          >
            <h3 className="text-sm">{add_on.title}</h3>
            <p className="text-primary-marine-blue text-sm self-center font-bold">
              +${add_on.price}/{isYearly ? "yr" : "mo"}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 pt-4 text-sm font-500">
        <p className="flex justify-between">
          <span>Total (per {formData.selectedPlan.billingOption})</span>
          <span className="text-16 lg:text-xl font-700 text-primary-purplish-blue">
            +${total}/{isYearly ? "yr" : "mo"}
          </span>
        </p>{" "}
      </div>
    </div>
  );
};

export default Summary;
