import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    // States
    const [password, setPassword] = useState("");
    const [length, setlength] = useState(12);
    const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
    const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [specialCharactorAllowed, setSpecialCharactorAllowed] =
        useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    // useRef hook for password to highlight the password when user clicks on copy button
    const passwordRef = useRef(null);

    // passwordGenerator useCallback hook to cache the function (optimization)
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let passStr = "";
        const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChar = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChar = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

        // Set the strength of the password
        if (length <= 4) setPasswordStrength("Very weak password");
        if (length >= 5 && length <= 7) setPasswordStrength("Weak password");
        if (length >= 8 && length <= 9) setPasswordStrength("Good password");
        if (length >= 10 && length <= 11)
            setPasswordStrength("Strong password");
        if (length >= 12) setPasswordStrength("Very strong password");

        // Append the password conditions (uppercase, lowercase, numbers, special characters)
        if (uppercaseAllowed) passStr += uppercaseChar;
        if (lowercaseAllowed) passStr += lowercaseChar;
        if (numberAllowed) passStr += numbers;
        if (specialCharactorAllowed) passStr += specialChar;

        // Generate the rendom password
        for (let i = 0; i < length; i++) {
            const random = Math.floor(Math.random() * passStr.length);
            pass += passStr[random] ? passStr[random] : "";
        }

        setPassword(pass);
    }, [
        length,
        lowercaseAllowed,
        uppercaseAllowed,
        numberAllowed,
        specialCharactorAllowed,
        setPassword,
    ]);

    // useCallback function to copy the password to clipboard
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password]);

    // useEffect hook to re-render the components on change
    useEffect(() => {
        passwordGenerator();
    }, [
        length,
        lowercaseAllowed,
        uppercaseAllowed,
        numberAllowed,
        specialCharactorAllowed,
        passwordGenerator,
    ]);

    return (
        // Background color
        <div
            className={`${
                passwordStrength === "Very weak password"
                    ? "bg-red-700"
                    : passwordStrength === "Weak password"
                    ? "bg-red-500"
                    : passwordStrength === "Good password"
                    ? "bg-yellow-500"
                    : passwordStrength === "Strong password"
                    ? "bg-green-500"
                    : "bg-green-700"
            } h-screen flex justify-center`}
        >
            <div className="px-5 h-min mt-5 sm:mt-12 sm:px-10 md:px-20 py-5 sm:py-7 md:py-10 w-11/12 sm:w-5/6 lg:w-auto bg-gray-900 rounded-lg flex flex-col items-center gap-y-5 text-white text-center">
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 text-orange-600">
                    Secure Pass
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                    Enhance Your Security
                </h2>
                <h3 className="text-base lg:text-lg -mb-3">
                    Generate Strong Passwords Instantly with Secure Pass
                </h3>
                <h3 className="text-base lg:text-lg mb-2 sm:mb-5">
                    Explore Our Random Password Generator for Secure and
                    Reliable Passwords
                </h3>

                {/* Password strength */}
                <h3
                    className={`${
                        passwordStrength === "Very weak password"
                            ? "text-red-700"
                            : passwordStrength === "Weak password"
                            ? "text-red-500"
                            : passwordStrength === "Good password"
                            ? "text-yellow-500"
                            : passwordStrength === "Strong password"
                            ? "text-green-500"
                            : "text-green-700"
                    } text-lg md:text-xl lg:text-2xl font-semibold`}
                >
                    {passwordStrength}
                </h3>

                {/* Password input */}
                <input
                    type="text"
                    className="w-full rounded-lg text-orange-600 text-lg md:text-xl lg:text-2xl font-medium outline-none px-5 py-2"
                    value={password ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                    readOnly
                />

                {/* Password length */}
                <label htmlFor="length" className="text-sm md:text-base">
                    Password Length:
                    <input
                        type="number"
                        name="length"
                        id="length"
                        min={1}
                        max={100}
                        value={length}
                        className="px-2 py-2 w-12 mb-2 sm:mb-0 sm:w-16 mx-3 rounded-lg text-gray-900 outline-none"
                        onChange={(e) => setlength(e.target.value)}
                    />
                    <input
                        type="range"
                        name="length"
                        min={1}
                        max={100}
                        id="length"
                        className="w-28 sm:w-40 mr-2 accent-green-500"
                        value={length}
                        onChange={(e) => setlength(e.target.value)}
                    ></input>
                </label>

                {/* Conditions: Uppercase, Lowercase, Digits, Symbols */}
                <div className="flex flex-wrap gap-3 text-sm lg:text-base justify-center text-white">
                    <button
                        name="uppercase"
                        id="uppercase"
                        value={uppercaseAllowed}
                        onClick={() => setUppercaseAllowed((prev) => !prev)}
                        className={`${
                            uppercaseAllowed ? "bg-green-600" : "bg-gray-700"
                        } h-min rounded-full px-10 py-1`}
                    >
                        <p>Uppercase</p>
                        <p>(e.g. ABC)</p>
                    </button>
                    <button
                        name="lowercase"
                        id="lowercase"
                        value={lowercaseAllowed}
                        onClick={() => setLowercaseAllowed((prev) => !prev)}
                        className={`${
                            lowercaseAllowed ? "bg-green-600" : "bg-gray-700"
                        } h-min rounded-full px-10 py-1`}
                    >
                        <p>Lowercase</p>
                        <p>(e.g. abc)</p>
                    </button>
                    <button
                        name="numbers"
                        id="numbers"
                        value={numberAllowed}
                        onClick={() => setNumberAllowed((prev) => !prev)}
                        className={`${
                            numberAllowed ? "bg-green-600" : "bg-gray-700"
                        } h-min rounded-full px-10 py-1`}
                    >
                        <p>Digits</p>
                        <p>(e.g. 123)</p>
                    </button>
                    <button
                        name="spacialChar"
                        id="spacialChar"
                        value={specialCharactorAllowed}
                        onClick={() =>
                            setSpecialCharactorAllowed((prev) => !prev)
                        }
                        className={`${
                            specialCharactorAllowed
                                ? "bg-green-600"
                                : "bg-gray-700"
                        } h-min rounded-full px-10 py-1`}
                    >
                        <p>Symbols</p>
                        <p>(e.g. @#$)</p>
                    </button>
                </div>

                {/* buttons */}
                <div className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-5 text-sm lg:text-base">
                    <button
                        className="bg-orange-600 w-24 sm:w-48 h-10 sm:h-12 rounded-lg font-medium text-white hover:bg-orange-700"
                        onClick={passwordGenerator}
                    >
                        Regenerate
                    </button>
                    <button
                        className="bg-orange-600 w-24 sm:w-48 h-10 sm:h-12 rounded-lg font-medium text-white hover:bg-orange-700"
                        onClick={copyPasswordToClipboard}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
