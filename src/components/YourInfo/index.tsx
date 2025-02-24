import "./style.css";
import { YourInfoProps } from "../../types/types";

const YourInfo = ({ formData, onUpdate, errors }: YourInfoProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({
      [name]: value,
    });
  };
  return (
    <div className="personal-info-form p-8 pe-5 pb-8">
      <h1 className="text-2xl font-700 lg:text-3xl">Personal info</h1>
      <p className="mt-3 text-neutral-cool-gray">
        Please provide your name, email address, and phone number.
      </p>

      <form className="mt-4 lg:mt-8 grid grid-cols-1 gap-4 ">
        <div className="input-group">
          <div className="flex justify-between">
            <label htmlFor="name" className="font-normal text-sm">
              Name
            </label>
            {errors?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <input
            type="text"
            value={formData.personalInfo.name}
            id="name"
            name="name"
            onChange={handleInputChange}
            className="mt-1 ps-4 block w-full h-11 border border-neutral-light-gray focus:border-neutral-cool-gray focus:ring-0 rounded-lg font-500"
            placeholder="e.g. Stephen King"
            required
          />
        </div>
        <div className="input-group">
          <div className="flex justify-between">
            <label className="font-normal text-sm" htmlFor="email">
              Email Address
            </label>

            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.personalInfo.email}
            onChange={handleInputChange}
            className="mt-1 ps-4 block w-full h-11 border border-neutral-light-gray focus:border-neutral-cool-gray focus:ring-0 rounded-lg font-500"
            placeholder="e.g. stephenking@lorem.com"
            required
          />
        </div>
        <div className="input-group">
          <div className="flex justify-between">
            <label className="font-normal text-sm" htmlFor="phone">
              Phone Number
            </label>
            {errors?.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.personalInfo.phone}
            onChange={handleInputChange}
            className="mt-1 ps-4 block w-full h-11 border border-neutral-light-gray focus:border-neutral-cool-gray focus:ring-0 rounded-lg font-500"
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </form>
    </div>
  );
};
export default YourInfo;
