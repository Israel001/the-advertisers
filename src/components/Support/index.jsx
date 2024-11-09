import React from 'react'
import Layout from "../Partials/Layout";
import PageTitle from "../Helpers/PageTitle";

const Support = () => {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Support", path: "/support" },
            ]}
            title="Support"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Support