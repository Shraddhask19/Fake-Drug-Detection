import React from 'react'

const Footer = () => {
    return (
        <footer className="text-gray-200 bg-gray-900 body-font mt-3" >
            <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <svg
                        class="w-8 text-yellow"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                    >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                    </svg>
                    <span className="ml-3 text-normal text-gray-300">Drug Verifation Tool</span>
                </a>
               
               
            </div>
        </footer >
    )
}

export default Footer