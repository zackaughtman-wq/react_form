import React, { useState } from 'react';

interface AcctType {
    id: number;
    name: string;
    checked: boolean;
};

interface FormData {
    memberNumber: string,
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes: string;
    isOkayToContact: boolean;
    selectedAcctTypes: AcctType[];
}

interface FormErrors {
    memberNumber?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    isOkayToContact?: string;
    selectedAcctTypes?: string;
}

export const ReferralForm: React.FC = () => { 
    const [acctTypes, setAcctTypes] = useState<AcctType[]>([
        { id: 1, name: "Checking", checked: false }, 
        { id: 2, name: "Savings", checked: false }, 
        { id: 3, name: "Money Market", checked: false }, 
        { id: 4, name: "CD", checked: false }, 
        { id: 5, name: "IRA", checked: false }, 
        { id: 6, name: "Loan", checked: false }
    ]);
    
    const toggleAcctType = (id: number) => {
        id--;
        const newItems = [...acctTypes];
        newItems[id].checked = !newItems[id].checked;
        setAcctTypes(newItems);  
    };

    const [formData, setFormData] = useState<FormData>({
        memberNumber: '', 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '', 
        notes: '', 
        isOkayToContact: false,
        selectedAcctTypes: acctTypes
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Format phone number as (XXX) XXX-XXXX
    const formatPhoneNumber = (value: string) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "");
        
        if (!digits.trim()) 
            return "";

        // Limit to 10 digits
        const limited = digits.substring(0, 10);

        // Apply formatting
        if (limited.length > 6) {
            return `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}-${limited.substring(6)}`;
        } else if (limited.length > 3) {
            return `(${limited.substring(0, 3)}) ${limited.substring(3)}`;
        } else if (limited.length > 0) {
            return `(${limited}`;
        }
        return "";
    };

    // Remove non-numeric characters from string
    const returnNumbersOnly = (value: string) => {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "");
        
        return digits;
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const formatted = formatPhoneNumber(value);
        setFormData((prev) => ({ ...prev, [name]: formatted }));
    };

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const numbersOnly = returnNumbersOnly(value);
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>  {
        const { name, value } = e.target;        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Validation logic
    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.memberNumber.trim()) {
            newErrors.memberNumber = "Member Number is required";
        } else if (formData.memberNumber.length < 6) {
            newErrors.memberNumber = "Member Number must be 6 numbers";
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (formData.phone.length < 9) {
            newErrors.phone = "Phone number must be 10 numbers";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        let acctSelected = false;
        formData.selectedAcctTypes.forEach((type) => {
            if(type.checked) {
                acctSelected = true;
            }
        });

        if(!acctSelected) {
            newErrors.selectedAcctTypes = "Account Type is required";
        }

        if (!formData.isOkayToContact) {
            newErrors.isOkayToContact = "Member must consent to being contacted";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault(); // Prevent page reload

        if(validate()) {
            // Simulate sending data
            console.log("Form submitted:", formData);

            // Reset form
            setFormData({ 
                memberNumber: '', 
                firstName: '', 
                lastName: '', 
                phone: '', 
                email: '', 
                notes: '', 
                isOkayToContact: false,
                selectedAcctTypes: acctTypes 
            });

            // Reset error messages
            setErrors({});
        }
  };

    return (
        <div className="card">  
            <div className='card-header span-all'>
                <h2 className='span-all'>Teller Referral Form</h2>
                <p>OUR MEMBERS ARE THE MISSION</p>
            </div>   

            <form onSubmit={handleSubmit} noValidate>                      
                <div className="form-group span-all">
                    {!errors.memberNumber && <label htmlFor="memberNumber">Member Number *</label>}
                    {errors.memberNumber && <label htmlFor="memberNumber">{errors.memberNumber} <span className="error-text">*</span></label>}
                    <input type="text" className={errors.memberNumber ? "error-input" : ""} maxLength={6} inputMode='numeric' pattern='[0-9]+' placeholder="Enter Member Number..." id="memberNumber" name="memberNumber" value={formData.memberNumber}  onChange={handleNumberInputChange} required />
                </div>

                <div className="form-group">
                    {!errors.firstName && <label htmlFor="firstName">First Name *</label>}
                    {errors.firstName && <label htmlFor="firstName">{errors.firstName} <span className="error-text">*</span></label>}
                    <input type="text" className={errors.firstName ? "error-input" : ""} placeholder="Enter First Name..." id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    {!errors.lastName && <label htmlFor="lastName">Last Name  *</label>}
                    {errors.lastName && <label htmlFor="lastName">{errors.lastName} <span className="error-text">*</span></label>}
                    <input type="text" className={errors.lastName ? "error-input" : ""} placeholder="Enter Last Name..." id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>       
                
                <div className="form-group">
                    {!errors.phone && <label htmlFor="phone">Phone  *</label>}
                    {errors.phone && <label htmlFor="phone">{errors.phone} <span className="error-text">*</span></label>}
                    <input type="text" className={errors.phone ? "error-input" : ""} maxLength={14} placeholder="###-###-####" id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} required />
                </div>

                <div className="form-group">
                    {!errors.email && <label htmlFor="email">Email  *</label>}
                    {errors.email && <label htmlFor="email">{errors.email} <span className="error-text">*</span></label>}
                    <input type="email" className={errors.email ? "error-input" : ""} placeholder="email@example.com" id="email" name="email" value={formData.email} onChange={handleChange} required />     
                </div>    

                <fieldset className={errors.selectedAcctTypes ? "span-all error-input" : "span-all"}>
                {!errors.selectedAcctTypes && <legend>Accounts Referred *</legend>}
                {errors.selectedAcctTypes && <legend>{errors.selectedAcctTypes} <span className="error-text">*</span></legend>}
                {acctTypes.map(item => (
                    <div className="form-group" key={item.id + 1}>
                        <input type="checkbox" id={item.name} name={item.name + "Referred"}  onChange={() => toggleAcctType(item.id)} />
                        <label htmlFor={item.name}>{item.name}</label>
                    </div>
                ))}
                </fieldset>

                <div className="form-group span-all">
                    <label htmlFor="notes">Notes  *</label>
                    <textarea placeholder="Enter Notes..." id="notes" name="notes" value={formData.notes} onChange={handleNotesChange}></textarea>
                </div>

                <div className={errors.isOkayToContact ? "form-group span-all error-input" : "form-group span-all"}>
                    <input type="checkbox" id="isOkayToContact" name="isOkayToContact" value="this.checked" onChange={handleChange} required />
                    {!errors.isOkayToContact && <label htmlFor="isOkayToContact">Member consents to being contacted by the team *</label>}
                    {errors.isOkayToContact && <label htmlFor="isOkayToContact">{errors.isOkayToContact} <span className="error-text">*</span></label>}
                </div>
                <button className="span-all">Submit</button>
            </form>
        </div>
    )
}
