import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

export default function AddDoctor() {
  const [docImg, setDocImg] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);
  const [diplomaCertificates, setDiplomaCertificates] = useState(null);
  const [proofOfID, setProofOfID] = useState(null);
  
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
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [universityCountry, setUniversityCountry] = useState('');
  const [medicalCouncilName, setMedicalCouncilName] = useState('');
  const [medicalCouncilCountry, setMedicalCouncilCountry] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  
  // New state variables for age and region
  const [age, setAge] = useState('');
  const [region, setRegion] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg || !medicalLicense || !diplomaCertificates || !proofOfID) {
      return toast.error('All images must be selected');
    }

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('medicalLicense', medicalLicense);
    formData.append('diplomaCertificates', diplomaCertificates);
    formData.append('proofOfID', proofOfID);
    
    // Append other form fields
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('age', age);  // Append age
    formData.append('region', region);  // Append region
    formData.append('universityName', universityName);
    formData.append('universityCountry', universityCountry);
    formData.append('medicalCouncilName', medicalCouncilName);
    formData.append('medicalCouncilCountry', medicalCouncilCountry);
    formData.append('graduationYear', graduationYear);

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form fields
        setDocImg(null);
        setMedicalLicense(null);
        setDiplomaCertificates(null);
        setProofOfID(null);
        setName('');
        setEmail('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
        setDateOfBirth('');
        setAge('');  // Reset age
        setRegion('');  // Reset region
        setUniversityName('');
        setUniversityCountry('');
        setMedicalCouncilName('');
        setMedicalCouncilCountry('');
        setGraduationYear('');
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

        {/* Upload Doctor Image */}
        <FileUploadField 
          label="Upload Doctor Picture" 
          file={docImg} 
          setFile={setDocImg} 
          asset={assets.upload_area} 
        />

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <InputField label="Doctor Name" value={name} onChange={setName} required />
            <InputField label="Doctor Email" value={email} onChange={setEmail} type="email" required />
            <InputField label="Doctor Password" value={password} onChange={setPassword} type="password" required />
            <SelectField label="Experience" value={experience} onChange={setExperience} options={experienceOptions} />
            <InputField label="Fees" value={fees} onChange={setFees} required />
            {/* New Age Field */}
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <SelectField label="Speciality" value={speciality} onChange={setSpeciality} options={specialityOptions} />
            <InputField label="Education" value={degree} onChange={setDegree} required />
            <InputField label="Address 1" value={address1} onChange={setAddress1} required />
            <InputField label="Address 2" value={address2} onChange={setAddress2} />
            {/* New Region Field */}
            <InputField label="Region" value={region} onChange={setRegion} required />
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

        {/* Upload Medical License */}
        <FileUploadField 
          label="Upload Medical License" 
          file={medicalLicense} 
          setFile={setMedicalLicense} 
          asset={assets.upload_area} 
        />

        {/* Upload Diploma Certificates */}
        <FileUploadField 
          label="Upload Diploma Certificates" 
          file={diplomaCertificates} 
          setFile={setDiplomaCertificates} 
          asset={assets.upload_area} 
        />

        {/* Upload Proof of ID */}
        <FileUploadField 
          label="Upload Proof of ID" 
          file={proofOfID} 
          setFile={setProofOfID} 
          asset={assets.upload_area} 
        />

        {/* New fields for additional doctor details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600">
          <InputField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} type="date" required />
          <InputField label="University Name" value={universityName} onChange={setUniversityName} required />
          <InputField label="University Country" value={universityCountry} onChange={setUniversityCountry} required /> 
          <InputField label="Medical Council Name" value={medicalCouncilName} onChange={setMedicalCouncilName} required />
          <InputField label="Medical Council Country" value={medicalCouncilCountry} onChange={setMedicalCouncilCountry} required />
          <InputField label="Graduation Year" value={graduationYear} onChange={setGraduationYear} required />
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

// Helper component for file upload
const FileUploadField = ({ label, file, setFile, asset }) => (
  <div className='flex items-center gap-4 mb-8 text-gray-500'>
    <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()}>
      <img
        onClick={() => document.getElementById(label.replace(/\s+/g, '-').toLowerCase()).click()}
        src={asset}
        alt="Upload"
        className='cursor-pointer hover:opacity-70'
      />
    </label>
    <input
      type='file'
      id={label.replace(/\s+/g, '-').toLowerCase()}
      accept='image/*'
      className='hidden'
      onChange={(e) => setFile(e.target.files[0])}
    />
    <span>{file ? file.name : `No file chosen for ${label}`}</span>
  </div>
);

// Experience options (customize as necessary)
const experienceOptions = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years'];

// Speciality options (customize as necessary)
const specialityOptions = ['General physician', 'Dentist', 'Cardiologist', 'Dermatologist', 'Pediatrician'];
