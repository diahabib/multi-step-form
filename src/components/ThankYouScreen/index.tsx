import iconThankYou from "../../assets/images/icon-thank-you.svg";
const ThankYouScreen = () => {
  return (
    <div className="flex flex-col items-center justify-around px-6 py-16 gap-4  text-neutral-cool-gray font-500">
      <img src={iconThankYou} alt="thank you icon" className="w-14" />
      <h1 className="text-primary-marine-blue text-2xl font-700">Thank you!</h1>
      <p className="text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default ThankYouScreen;
