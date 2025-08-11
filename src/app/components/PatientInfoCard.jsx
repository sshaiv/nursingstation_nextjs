
import LineItem from "../common/PatientInfo";
export default function PatientInfoCard({
  name,
  age,
  gender,
  bedNo,
  doctor,
  billingGroup,
  phone,
}) {
  return (
    <div className="w-full  border-1 border-[#DCCFC0] border-r-2 border-l-2 bg-[#FAF9EE] rounded shadow-sm p-2 md:p-3 text-xs space-y-2">
      {/* ✅ ALL DETAILS IN ONE CLEAN ROW */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-700 font-medium ">
        <img
          src="/patient.jpeg"
          alt="Patient"
          className="w-6 h-6 rounded-full object-cover"
        />

        <div className="flex items-center gap-2 font-bold text-gray-800 text-[12px] ">
          {name}
          <span className="text-gray-500 font-semibold">
            ({age} yrs, {gender})
          </span>
        </div>
<hr className="mr-2"></hr>

        <LineItem icon=" " label="Bed No" value={bedNo} />
        <LineItem icon="" label="Primary Dr." value={doctor} />
        <LineItem icon="" label="Billing Group" value={billingGroup} />
        <LineItem icon=" " label="Phone" value={phone} />
      </div>
    </div>
  );
}
