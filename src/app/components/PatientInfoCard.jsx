

import { FaBed, FaUserMd, FaPhone, FaMoneyBill } from 'react-icons/fa';
import LineItem from '../common/PatientInfo';
import ReusableInputField from '../common/SmallInputfields';

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
       
            <div className="border-1  border-blue-200  bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 shadow-xl rounded-lg p-4 flex flex-col gap-4 cursor-zoom-in transition-transform duration-150 transform hover:scale-101 hover:shadow-2xl hover:bg-gray-100">
            
            {/* 1️⃣ Patient Name Section */}
            <div className="flex items-center gap-3 text-lg font-semibold">
                <img
                    src="/patient.jpeg"
                    alt="Patient"
                    className="w-8 h-6 rounded-full object-cover"
                />
                <div>
                {/* <span className="text-m font-semibold text-gray-800"> */}
                <span className="text-lg sm:text-base md:text-lg font-semibold text-gray-800">
                {name}{' '}
                    </span>
                   <span className="text-sm sm:text-xs md:text-sm font-normal text-gray-600">
                    {/* <span className="text-sm font-normal text-gray-600"> */}
                        ({age}, {gender})
                    </span>
                </div>
            </div>
            <hr className="border-t border-gray-300" />


            {/* 2️⃣ Patient Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <LineItem
                    icon={<FaBed className="text-brown-500" />}
                    label="Bed No"
                    value={bedNo}
                />
                <LineItem
                    icon={<FaUserMd className="text-blue-500" />}
                    label="Primary Dr."
                    value={doctor}
                />
                <LineItem
                    icon={<FaMoneyBill className="text-blue-900" />}
                    label="Billing Group"
                    value={billingGroup}
                />
                <LineItem
                    icon={<FaPhone className="text-purple-900" />}
                    label="Phone"
                    value={phone}
                />
            </div>

          

            {/* 4️⃣ Input Fields */}
            <div className="grid grid-cols-3 gap-3">
                <ReusableInputField id="height" label="Height/cm" width="w-full" />
                <ReusableInputField id="weight" label="Weight/Kg" width="w-full" />
                <ReusableInputField id="painScore" label="Pain Score" width="w-full" />
            </div>
        </div>
    );
}
