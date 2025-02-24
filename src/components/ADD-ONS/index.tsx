import { useEffect, useState } from "react";
import "./style.css";
import { AddonsProps } from "../../types/types";

interface AddOn {
  title: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

const ADD_ONS: AddOn[] = [
  {
    title: "Online service",
    description: "Access to muliplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    title: "Custimizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];
const Addons = ({ formData, onUpdate }: AddonsProps) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(
    formData.selectedAddOns?.map((addon) => addon.title) || []
  );
  //console.log(`Test `);
  //console.log(formData);
  const isYearly = formData["selectedPlan"].billingOption === "yearly";

  useEffect(() => {
    // Mettre à jour les prix quand le billing change
    const updatedAddOns = selectedAddOns.map((title) => {
      const addon = ADD_ONS.find((a) => a.title === title);
      return {
        title,
        price: isYearly ? addon!.yearlyPrice : addon!.monthlyPrice,
      };
    });

    onUpdate(updatedAddOns);
  }, [isYearly]);

  const handleCheckboxChange = (title: string) => {
    setSelectedAddOns((prevSelected) => {
      const newSelection = prevSelected.includes(title)
        ? prevSelected.filter((t) => t !== title)
        : [...prevSelected, title];

      const updatedAddOns = newSelection.map((t) => {
        const addon = ADD_ONS.find((a) => a.title === t);
        return {
          title: t,
          price: isYearly ? addon!.yearlyPrice : addon!.monthlyPrice,
        };
      });

      onUpdate(updatedAddOns);

      return newSelection;
    });
  };

  return (
    <div className="text-primary-marine-blue mb-4 p-4 pt-8 ps-10  lg:ps-8">
      <h1 className="font-700 text-2xl lg:text-3xl">Pick add-ons</h1>
      <p className="mt-3 text-neutral-cool-gray">
        Add-ons help enhance your gaming experience.
      </p>
      <div className="mt-4 md:mt-8 gap-3 flex flex-col grow-1">
        {ADD_ONS.map((add_on) => (
          <button
            key={add_on.title}
            onClick={() => handleCheckboxChange(add_on.title)}
            className={`flex  basis-1/4 grow gap-4 py-4 lg:py-5 md border border-neutral-light-gray hover:border-primary-purplish-blue transition-all rounded-lg
              ${
                selectedAddOns.includes(add_on.title)
                  ? "border-purple-900 bg-magnolia bg-neutral-alabaster"
                  : "border-light-gray"
              }`}
          >
            <div className="flex text-start basis-3/4 ps-4">
              {/*<input
                type="checkbox"
                checked={selectedAddOns === add_on.title}
                alt={add_on.title}
                className="w-12 h-5  "
              />{" "}
              */}
              <label className="w-8 h-5 self-center relative inline-flex items-center cursor-pointer">
                {/* Input caché */}
                <input
                  type="checkbox"
                  id={`addon-${add_on.title}`}
                  readOnly
                  onChange={() => handleCheckboxChange(add_on.title)}
                  checked={selectedAddOns.includes(add_on.title)}
                  aria-label={`Select ${add_on.title}`}
                  //onChange={(e) => handleCheckboxChange(e, add_on.title)}
                  className="absolute opacity-0 h-0 w-0 peer"
                />

                {/* Checkbox personnalisée */}
                <span
                  className="w-5 h-5 border-2 border-neutral-light-gray rounded-md 
              flex items-center justify-center
              peer-checked:bg-primary-purplish-blue peer-checked:border-primary-purplish-blue
              transition-colors duration-200
              peer-focus:ring-2 peer-focus:ring-primary-purplish-blue
              peer-hover:border-primary-purplish-blue"
                >
                  {/* Checkmark SVG */}
                  <svg
                    className="w-4 h-4 text-white  peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>

                {/* Texte accessible uniquement pour les lecteurs d'écran */}
                <span className="sr-only">Select {add_on.title}</span>
              </label>
              <div>
                <h3 className="text-primary-marine-blue font-bold text-sm">
                  {add_on.title}
                </h3>
                <p className="text-xs lg:text-sm text-neutral-cool-gray font-500">
                  {add_on.description}
                </p>
              </div>
            </div>
            <p className="text-primary-purplish-blue  text-sm self-center pe-2">
              +${isYearly ? add_on.yearlyPrice : add_on.monthlyPrice}/
              {isYearly ? "yr" : "mo"}
            </p>
            {isYearly && (
              <p className="text-xs text-marine-blue mt-1">2 months free</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Addons;
