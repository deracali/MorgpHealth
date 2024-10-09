import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext'; // Ensure this matches your export
import axios from 'axios';

export default function AddDoctor() {
  const [docImg, setDocImg] = useState(null); // Changed to null for better checking
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
      return toast.error('Image not Selected');
    }

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { Authorization: `Bearer ${aToken}` }, // Adjusted token format
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form fields
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc-img'>
            <img
              onClick={() => document.getElementById('doc-img').click()} // Trigger file input click
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=''
            />
          </label>
          <input
            type='file'
            id='doc-img'
            hidden
            onChange={(e) => setDocImg(e.target.files[0])} // Capture the image on file change
          />
          <p>Upload doctor <br/> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <InputField label="Doctor Name" value={name} onChange={setName} required />
            <InputField label="Doctor Email" value={email} onChange={setEmail} type="email" required />
            <InputField label="Doctor Password" value={password} onChange={setPassword} type="password" required />
            <SelectField label="Experience" value={experience} onChange={setExperience} options={experienceOptions} />
            <InputField label="Fees" value={fees} onChange={setFees} required />
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <SelectField label="Speciality" value={speciality} onChange={setSpeciality} options={specialityOptions} />
            <InputField label="Education" value={degree} onChange={setDegree} required />
            <InputField label="Address 1" value={address1} onChange={setAddress1} required />
            <InputField label="Address 2" value={address2} onChange={setAddress2} />
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='w-full px-4 pt-2 border rounded'
            placeholder='Write about doctor'
            rows={5}
            required
          />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
      </div>
    </form>
  );
}

// Helper component for input fields
const InputField = ({ label, value, onChange, type = 'text', required = false }) => (
  <div className='flex-1 flex flex-col gap-1'>
    <p>{label}</p>
    <input
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className='border rounded px-3 py-2'
      type={type}
      placeholder={label}
      required={required}
    />
  </div>
);

// Helper component for select fields
const SelectField = ({ label, value, onChange, options }) => (
  <div className='flex-1 flex flex-col gap-1'>
    <p>{label}</p>
    <select onChange={(e) => onChange(e.target.value)} value={value} className='border rounded px-3 py-2'>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Sample options for select fields
const experienceOptions = Array.from({ length: 10 }, (_, i) => `${i + 1} Year`);
const specialityOptions = [
  "General physician", "Gynecologist", "Dermatologist",
  "Pediatricians", "Neurologist", "Gastroenterologist"
];