import Image from "next/image"
import safe from "@/public/images/safe.png"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">

      {/* HERO SECTION */}

      <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 items-center justify-around py-20 bg-green-100/10 rounded-xl px-4">

        <div className="flex flex-col items-center md:items-start space-y-8">

          <div className="flex  flex-col gap-6 text-3xl font-semibold">
            <h4>Real Security,</h4>
            <h4>Real Privacy</h4>
          </div>

          <p className="max-w-sm">Some random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloremque sunt, labore laudantium beatae tenetur sit dolorum saepe consequuntur adipisci sequi dolores ipsa quae ipsum soluta odio. Nam, eveniet quae!</p>

          <button className="bg-green-100/30 py-3 px-8 text-white font-semibold rounded-md">Get Started</button>
        </div>

        <div className="">
          <Image src={safe} className="w-[400px]" alt="..." />
        </div>

      </div>

      <div className="flex flex-col pt-16">
        <div className="md:text-center text-justify md:tracking-wider text-lg font-semibold md:leading-[30px]">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias placeat reiciendis cumque aliquam, blanditiis dolorum minima cupiditate, perspiciatis quidem soluta asperiores minus laboriosam error ex nesciunt, maxime quaerat ab animi. Sunt magni error libero a consectetur fugiat, asperiores impedit praesentium et veritatis autem deleniti molestias nisi dolores distinctio illum.</span>
        </div>

        <div className="flex flex-col md:flex-row bg-green-100/10 items-center p-10 my-10 drop-shadow-xl">
          <Image src={safe} alt="..." />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ab fuga asperiores reprehenderit quod quam ipsam vitae minus ad maiores.
          </div>
        </div>

      </div>

    </div>
  )
}
