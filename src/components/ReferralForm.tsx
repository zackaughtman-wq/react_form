import React, { useState } from 'react';

interface Referral {
    memberType: string;
    memberNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes: string;
    canContact: boolean;
    checkingReferred: boolean;
    savingsReferred: boolean;
    mmReferred: boolean;
    cdReferred: boolean;
    iraReferred: boolean;
    loanReferred: boolean;
}

export function ReferralForm() {
    const [formData, setFormData] = useState<Referral>({
        memberType: 'personal', 
        memberNumber: '', 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '', 
        notes: '', 
        canContact: false, 
        checkingReferred: false, 
        savingsReferred: false, 
        mmReferred: false, 
        cdReferred: false, 
        iraReferred: false, 
        loanReferred:  false, 
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }
    
    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>  {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitted Referral Data:', formData);
    }

    return (
        <div className="referral">          
            <h2 className='span-all'>Referral Form</h2>
            <hr />

            <form onSubmit={handleSubmit}>                      
                <div className="form-group span-all">
                    <label htmlFor="memberNumber">Member Number</label>
                    <input type="text" placeholder="Enter Member Number..." id="memberNumber" name="memberNumber" value={formData.memberNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" placeholder="Enter First Name..." id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" placeholder="Enter Last Name..." id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>               
                

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" placeholder="###-###-####" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="email@example.com" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>    

                <fieldset className="span-all">
                <legend>Account Types Referred *</legend>
                    <div className="form-group">
                        <input type="checkbox" id="checking" name="checkingReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="checking">Checking</label>
                    </div>

                    <div className="form-group">
                        <input type="checkbox" id="savings" name="savingsReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="savings">Savings</label>
                    </div>          

                    <div className="form-group">
                        <input type="checkbox" id="moneyMarket" name="mmReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="moneyMarket">Money Market</label>
                    </div>

                    <div className="form-group">
                        <input type="checkbox" id="cd" name="cdReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="cd">Certificate of Deposit (CD)</label>
                    </div>

                    <div className="form-group">
                        <input type="checkbox" id="ira" name="iraReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="ira">Individual Retirement Account (IRA)</label>
                    </div>                        

                    <div className="form-group">
                        <input type="checkbox" id="loan" name="loanReferred" value="this.checked" onChange={handleChange} />
                        <label htmlFor="loan">Loan</label>
                    </div>    
                </fieldset>

                <div className="form-group span-all">
                    <label htmlFor="notes">Notes</label>
                    <textarea placeholder="Add Notes..." id="notes" name="notes" value={formData.notes} onChange={handleNotesChange} required></textarea>
                </div>

                <div className="form-group span-all">
                    <input type="checkbox" id="canContact" name="canContact" value="this.checked" onChange={handleChange} required />
                    <label htmlFor="canContact">Member consents to being contacted by the team</label>
                </div>
                <button className="span-all">Submit</button>
            </form>
        </div>
    )
}
