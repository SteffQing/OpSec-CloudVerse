"use client";

export default function Page() {
  return (
    <main className="px-4 md:px-6 pt-44 md:pt-24 bg-[#0A0B14]">
      <div className="mt-6">
        <BoxWrapper
          children={<ProxyGenerator />}
          title="Proxy Generator"
          textAlign="text-left"
        />
      </div>
    </main>
  );
}

import { Doc_Copy, Import } from "@/assets/client_icons";
import BoxWrapper from "@/components/Box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Plans, countries } from "@/lib/data";

function ProxyGenerator() {
  return (
    <div className="flex flex-col md:flex-row">
      <aside>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem value={country.toLowerCase()}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <input
            type="number"
            placeholder="Amount"
            className="border border-[#1D202D] rounded-md py-2 px-5 my-4 login-input"
          />
          <span>+</span>
          <span>-</span>
        </div>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {Plans.map((plan) => (
              <SelectItem value={plan.trim().toLowerCase()}>{plan}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Scheme Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </aside>
      <aside>
        <span></span>
        resi1.proxies.rip:1337:gtj4tywa1ppdykoya502oa:dU7sYgLHkalnkIrx
        <Doc_Copy />
        <Import />
      </aside>
    </div>
  );
}
