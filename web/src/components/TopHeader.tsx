import React from 'react'

interface TopHeaderProps {

}

export const TopHeader: React.FC<TopHeaderProps> = ({}) => {
    return (
        <>
              {/* ::Top Header */}
              <div className="relative px-4 w-full flex justify-between items-center bg-secondary">
                {/* :::Language select */}
                <div>
                    <label htmlFor="language" className="sr-only">Select your language</label>
                    <select name="language" id="language" className="form-select bg-secondary border-none text-sm font-bold outline-none cursor-pointer focus:ring-0">
                        <option value="english">EN</option>
                        <option value="french">PL</option>
                    </select>
                </div>
                {/* :::Promo text */}
                <p className="block lg:absolute lg:top-1/2 lg:left-1/2 text-sm font-semibold transform lg:-translate-y-1/2 lg:-translate-x-1/2">Winter sale! Check our recommendations</p>
                {/* :::SignIn/SignUp & Search bar */}
                
                {/*<div className="inline-flex items-center">
                    <p className="mr-4 text-sm">
                    <a href="#goToSignin" className="mr-2 font-semibold hover:underline">
                        <span className="hidden md:inline">Sign In</span>
                    </a>
                    <span className="hidden md:inline"> | </span>
                    <a href="#goToSignUp" className="ml-2 font-semibold hover:underline">
                        <span className="hidden md:inline">Sign Up</span>
                    </a>
                    </p>
                </div> */}
                </div>
        </>
    )
}