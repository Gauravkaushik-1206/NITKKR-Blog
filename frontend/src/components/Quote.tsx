import { motion } from "framer-motion"

export const Quote = () =>{
    return (
        <div className="min-h-screen w-full flex">

        {/* // <div className="flex flex-col bg-slate-200 h-screen justify-center">
        //     <div className="flex justify-center">
        //         <div className="max-w-md">
        //             <div className="text-2xl font-bold">
        //                 "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
        //             </div>
        //             <div className="text-xl font-semibold mt-4">
        //                 Jules Winnield
        //             </div>
        //             <div className="text-sm font-light text-slate-400">
        //                 CEO, Acme Inc
        //             </div>
        //         </div>
        //     </div>
        // </div> */}
       <motion.div
        className="hidden lg:flex lg:flex-1 bg-gray-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-lg">
            <motion.blockquote
              className="text-3xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              "The customer service I received was exceptional. The support team went above and beyond to address my
              concerns."
            </motion.blockquote>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="font-semibold">Jules Winnfield</p>
              <p className="text-muted-foreground">CEO, Acme Inc</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </div>
    )
}