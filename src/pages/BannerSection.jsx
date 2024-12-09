
import React from 'react';

const BannerSection = () => {
  return (
    <section className=" my-10">
      <div className="relative bg-cover bg-blend-multiply bg-blue-00 text-center h-[90vh]" style={{ backgroundImage: "url('src/assets/img/Section.jpg')" }}>
        <div className="container mx-auto">
          <div className="flex justify-start">
            <div>
              <div className="mt-52">
                <h2 className="text-6xl font-bold text-red-600">2023</h2>
                <h3 className="text-4xl mt-2 uppercase font-semibold">fashion trends</h3>
                <h4 className="text-2xl mt-4 uppercase text-gray-400">special offer</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;