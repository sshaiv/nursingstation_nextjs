

import { FaBed, FaUserMd, FaPhone, FaMoneyBill } from 'react-icons/fa';
import LineItem from '../common/PatientInfo';
import ReusableInputField from '../common/SmallInputfields';
import { H3, Label } from '../common/text';

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
    <div className="w-full border border-gray-200 bg-white rounded-md shadow-sm p-2 md:p-3 text-xs space-y-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <img
          src="/patient.jpeg"
          alt="Patient"
          className="w-6 h-6 rounded-full object-cover"
        />

        <div className="flex items-center space-x-1 font-semibold text-gray-800 text-sm leading-tight">        
          <H3>{name}</H3>
          <Label>({age}, {gender})</Label>        
        </div>

      </div>

      <hr className="border-t border-gray-300" />

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-2 ">
        <LineItem icon={<FaBed className="text-brown-500" />} label="Bed No" value={bedNo} />
        <LineItem icon={<FaUserMd className="text-blue-500" />} label="Primary Dr." value={doctor} />
        <LineItem icon={<FaMoneyBill className="text-blue-900" />} label="Billing Group" value={billingGroup} />
        <LineItem icon={<FaPhone className="text-purple-900" />} label="Phone" value={phone} />
      </div>

      <hr className="border-t border-white" />
      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-2 ">
        <ReusableInputField id="height" label="Height/cm" width="w-full" size="sm" />
        <ReusableInputField id="weight" label="Weight/Kg" width="w-full" size="sm" />
        <ReusableInputField id="painScore" label="Pain Score" width="w-full" size="sm" />
      </div>
    </div>
  );
}
