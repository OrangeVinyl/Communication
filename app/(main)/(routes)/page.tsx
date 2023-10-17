import {Button} from "@/components/ui/button";

const state = false;
export default function Home() {
  return (
   <div>
     <p className={"text-3xl font-bold text-indigo-500"}>Hello</p>
       {/* eslint-disable-next-line react/jsx-no-undef */}
       <Button>Click me</Button>
   </div>
  )
}
