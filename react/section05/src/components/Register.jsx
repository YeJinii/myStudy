import { useState } from 'react';
// 간단한 회원가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {

    const [input, setInput] = useState ({
        name: "",
        birth: "",
        country: "",
        bio: ""
    });

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const onChangeBio = (e) => {
        setInput({
            ...input,
            bio: e.target.value
        });
    }    

    return (
        <div>
            <div>
                <input
                    name="name"
                    value={input.name} 
                    onChange={onChange} 
                    placeholder="이름" 
                />
            </div>

            <div>
                <input 
                    type="date"
                    name="birth"
                    value={input.birth}
                    onChange={onChange}
                />
            </div>

            <div>
                <select
                    name="country"
                    value={input.country} 
                    onChange={onChange}>
                    <option value="">선택</option>
                    <option value="kr">한국</option>
                    <option value="us">미국</option>
                    <option value="uk">영국</option>
                </select>
            </div>

            <div>
                <textarea
                    name="bio"
                    value={input.bio} 
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default Register;