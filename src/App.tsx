import { useState } from "react";
import "./App.css";
import YourInfo from "./components/YourInfo";
import SelectPlan from "./components/SelectPlan";
import Addons from "./components/ADD-ONS";
import Summary from "./components/SUMMARY";
import billingOptions from "./constants/billingOptions";
import { FormData } from "./types/types";
import ThankYouScreen from "./components/ThankYouScreen";

const steps = [
  {
    number: 1,
    title: "YOUR INFO",
    step: "STEP 1",
  },
  {
    number: 2,
    title: "SELECT PLAN",
    step: "STEP 2",
  },
  {
    number: 3,
    title: "ADD-ONS",
    step: "STEP 3",
  },
  {
    number: 4,
    title: "SUMMARY",
    step: "STEP 4",
  },
  {
    number: 5,
    title: "CONFIRM",
    step: "STEP 5",
  },
];

const initialFormState: FormData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  selectedPlan: {
    plan: "",
    billingOption: billingOptions.MONTHLY,
  },
  selectedAddOns: [],
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    switch (currentStep) {
      case 1: {
        const { name, email, phone } = formData.personalInfo;
        const newErrors: Record<string, string> = {};
        const fieldRequireError = "This field is required";

        if (!name.trim()) newErrors.name = fieldRequireError;
        if (!email.trim()) newErrors.email = fieldRequireError;
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
        if (!phone.trim()) newErrors.phone = fieldRequireError;

        return newErrors;
      }
      case 2:
        return !formData.selectedPlan.plan
          ? { plan: "Please select a plan" }
          : {};

      default:
        return {};
    }
  };

  const handleFormChange = (
    section: keyof FormData,
    data: Partial<FormData[keyof FormData]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: Array.isArray(data) ? data : { ...prev[section], ...data },
    }));
  };

  const handleNextStep = () => {
    const validationErrors = validateStep();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <YourInfo
            formData={formData}
            onUpdate={(data) => handleFormChange("personalInfo", data)}
            errors={errors}
          />
        );
      case 2:
        return (
          <SelectPlan
            formData={formData}
            onUpdate={(data) => handleFormChange("selectedPlan", data)}
            error={errors.plan}
          />
        );
      case 3:
        return (
          <Addons
            formData={formData}
            onUpdate={(data) => handleFormChange("selectedAddOns", data)}
          />
        );
      case 4:
        return <Summary formData={formData} />;

      case 5:
        return <ThankYouScreen />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="container lg:p-4 flex flex-col lg:flex-row lg:gap-x-14 w-screen min-h-screena lg:w-[60vw] lg:h-[75vh] overflow-y-auto lg:rounded-2xl text-white mx-auto relative">
        <div className="steps-sidebar h-full basis-1/3 flex-grow lg:basis-2/6 lg:rounded-lg flex justify-center lg:justify-start lg:items-start">
          <ul className="flex justify-between lg:flex-col gap-x-6 lg:gap-y-8 lg:ps-6 pt-10">
            {steps.map(
              (step, index) =>
                index !== steps.length - 1 && (
                  <li className="step-item lg:flex lg:gap-x-4" key={index}>
                    <span
                      className={` inline-flex items-center justify-center ${
                        currentStep == index + 1 ? "current-step" : ""
                      } border-2 lg:border rounded-full h-8 w-8 lg:py-1 lg:px-3 `}
                    >
                      {step.number}
                    </span>
                    <span className="step-numeration ">
                      <p className="text-xs text-neutral-cool-gray font-bold">
                        {step.step}
                      </p>
                      <h3 className="text-sm">{step.title}</h3>
                    </span>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="form-container relative grid basis-4/4 h-full lg:basis-2/3 lg:pt-16 lg:pe-12 pb-24">
          <div className="bg-white absolute lg:relative w-11/12 place-self-center lg:h-11/12 -top-20 mt-1 rounded-xl lg:pt-2">
            {renderStepContent()}
          </div>
          {currentStep != steps.length && (
            <div
              className={`${
                currentStep == 1 ? "block " : "flex"
              }  justify-between p-4 bg-white w-full text-right mt-10 fixed lg:absolute end-0 bottom-0 lg:pe-24 z-10 `}
            >
              {currentStep != 1 && (
                <button
                  className=" text-neutral-cool-gray font-bold h-11 w-28  rounded-md "
                  onClick={handlePrevStep}
                >
                  Go Back
                </button>
              )}

              <button
                className={`${
                  currentStep == steps.length - 1
                    ? "bg-primary-purplish-blue"
                    : "bg-primary-marine-blue"
                }  text-white h-11 w-28 rounded-md `}
                onClick={handleNextStep}
              >
                {currentStep == steps.length - 1 ? "Confirm" : "Next Step"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
