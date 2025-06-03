const Hero = () => {
  return (
    <div className="w-full">

      <div className="flex max-lg:flex-col justify-between items-center min-h-[20vh]">

        <div className="flex flex-col justify-center mt-lg gap-2">
          <h1 className="lg:text-6xl md:text-5xl text-3xl bg-background font-title">Aymen Shoteri</h1>
          <h2 className="lg:text-3xl md:text-2xl text-xl bg-background font-title">Full Stack Developer</h2>
        </div>
        
        <div className="flex items-center justify-center p-[2px] bg-primary rounded-xl">
          <img
            src="./aymen.png"
            className="h-[25vh] rounded-xl border-2 border-black object-contain"
            alt="Aymen Shoteri"
          />
        </div>

      </div>
      
      


    </div>
  );
};

export default Hero;
