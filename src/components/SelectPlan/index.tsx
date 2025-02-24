import "./style.css";
import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";
import { useEffect, useState } from "react";
import { SelectPlanProps } from "../../types/types";
import billingOptions from "../../constants/billingOptions";

const SelectPlan = ({ formData, onUpdate, error }: SelectPlanProps) => {
  const plans = [
    {
      icon: iconArcade,
      title: "Arcade",
      monthlyPrice: 9,
      yearlyPrice: 90,
    },
    {
      icon: iconAdvanced,
      title: "Advanced",
      monthlyPrice: 12,
      yearlyPrice: 120,
    },
    {
      icon: iconPro,
      title: "Pro",
      monthlyPrice: 15,
      yearlyPrice: 150,
    },
  ];

  //console.log(formData);

  const [billingOption, setBillingOption] = useState(
    formData.selectedPlan.billingOption
  );
  const [selectedPlan, setSelectedPlan] = useState(formData.selectedPlan.plan);

  useEffect(() => {
    setBillingOption(formData.selectedPlan.billingOption);
    setSelectedPlan(formData.selectedPlan.plan);
  }, [formData.selectedPlan]);

  const handlePlanSelection = (planTitle: string) => {
    const selected = plans.find((p) => p.title === planTitle);
    if (!selected) return;

    setSelectedPlan(planTitle);

    onUpdate({
      plan: selected.title,
      monthlyPrice: selected.monthlyPrice,
      yearlyPrice: selected.yearlyPrice,
      billingOption: billingOption,
    });
  };

  const toggleBilling = () => {
    const newBillingOption =
      billingOption === billingOptions.MONTHLY
        ? billingOptions.YEARLY
        : billingOptions.MONTHLY;

    setBillingOption(newBillingOption);

    onUpdate({
      ...formData.selectedPlan,
      billingOption: newBillingOption,
    });
  };

  const isYearly = billingOption === billingOptions.YEARLY;

  return (
    <div className="text-primary-marine-blue p-4 pt-8 ps-8 lg:ps-8">
      <h1 className="font-700 text-2xl lg:text-3xl">Select your plan</h1>
      <p className="mt-3 text-neutral-cool-gray">
        You have the option of monthly or yearly billing
      </p>
      {error && (
        <p className="text-primary-strawberry-red text-sm mb-2">{error}</p>
      )}
      <div className="mt-4 md:mt-8 gap-3 flex flex-col md:flex-row grow-1 ">
        {plans.map((plan) => (
          <button
            key={plan.title}
            onClick={() => handlePlanSelection(plan.title)}
            className={`flex md:flex-col basis-1/4 grow gap-4 p-4 md border border-neutral-light-gray hover:border-primary-purplish-blue transition-all rounded-xl lg:pb-10
              ${
                selectedPlan === plan.title
                  ? "border-purple-900 bg-magnolia bg-neutral-alabaster"
                  : error
                  ? "border-primary-strawberry-red"
                  : "border-light-gray"
              } 
              `}
          >
            <img src={plan.icon} alt={plan.title} className="w-10" />
            <div className="text-start">
              <h3 className="text-primary-marine-blue font-bold text-base">
                {plan.title}
              </h3>
              <p className="text-neutral-cool-gray text-sm">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}/
                {isYearly ? "yr" : "mo"}
              </p>
              {isYearly && (
                <p className="text-xs text-marine-blue mt-1">2 months free</p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-neutral-magnolia p-3 rounded-xl flex items-center justify-center gap-6 mt-4 text-sm mb-1">
        <span
          className={`font-medium ${
            isYearly ? "text-primary-marine-blue" : "text-neutral-cool-gray"
          }`}
        >
          Monthly
        </span>

        <label className="relative inline-block w-10 h-5">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={toggleBilling}
            className="opacity-0 w-0 h-0 "
          />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 
            bg-primary-marine-blue rounded-full transition-colors before:absolute before:h-3 
            before:w-3 before:left-0 before:bottom-1 before:bg-white before:rounded-full 
            before:transition-transform ${
              isYearly ? "before:translate-x-6" : "before:translate-x-1"
            } focus:shadow-white`}
          />
        </label>

        <span
          className={`font-medium ${
            !isYearly ? "text-primary-marine-blue" : "text-neutral-cool-gray"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
};

export default SelectPlan;
