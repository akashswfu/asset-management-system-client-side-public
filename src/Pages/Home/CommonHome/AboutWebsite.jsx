import React from "react";

const AboutWebsite = () => {
  return (
    <div>
      <h2 className="text-center uppercase text-2xl md:text-4xl py-10 md:py-20 text-green-500 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 bg-clip-text">
        About This Website
      </h2>
      <div className="bg-gray-100 md:p-20 flex justify-center items-center">
        <div className="md:p-20 p-10 text-justify shadow-2xl">
          <p className="text-black">
            I have developed a comprehensive website tailored specifically for
            HR managers and employees, featuring two distinct sections to
            accommodate their unique needs. The section for HR managers, who act
            as admins, provides robust functionality, enabling them to add,
            delete, and update products seamlessly. Additionally, HR managers
            have the capability to add employees to their respective teams,
            facilitating efficient team management. On the other hand, the
            section for employees is designed to allow them to request items
            from HR managers, but this functionality is contingent upon their
            association with a team under an HR manager. Without this team
            association, employees are restricted from making product requests,
            ensuring a controlled and organized process. To maintain security
            and proper access control, the website employs separate routes for
            HR managers and employees. This segregation ensures that HR managers
            cannot access employee-specific routes and vice versa, preserving
            the integrity of each section's functionalities. Registration is a
            prerequisite for all users, guaranteeing that only authenticated
            individuals can access the system. The authentication process is
            robust, ensuring secure login credentials for both HR managers and
            employees. The backend of the website is powered by MongoDB, a
            reliable and efficient database solution that supports the system's
            data management needs. This well-structured system not only
            streamlines operations for HR managers by providing them with
            comprehensive tools for product and team management but also offers
            employees a clear and structured process for requesting necessary
            items. The clear delineation of roles and responsibilities within
            the website enhances both security and functionality, making it an
            effective solution for managing HR and employee interactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutWebsite;
