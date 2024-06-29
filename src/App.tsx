import { useRef, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "./components/ui/button";
import html2canvas from "html2canvas";
import Logo from "@/assets/logo.png";
import moment from "moment";

import SmallLogo from "@/assets/palm-tree.png";
import { Input } from "./components/ui/input";
import { Dialog, DialogContent } from "./components/ui/dialog";
import { Label } from "./components/ui/label";

function generateInvoiceNumber() {
  const prefix = "INV";
  const timestamp = Date.now();
  const uniquePart = (timestamp % 1000).toString().padStart(6, "0"); // Get the last 3 digits of the timestamp
  const invoiceNumber = `${prefix}${uniquePart}`;
  return invoiceNumber;
}

const formData = {
  name: "",
  address: "",
  invNumber: generateInvoiceNumber(),
  contact: "",
  checkindate: "",
  checkoutdate: "",
  roomtype: "",
  roomRatePerNight: "0",
  numberOfNights: "0",
  accommodation: "6000",
  meals: "10000",
  spaServices: "0",
  activities: "0",
  games: "0",
  transportation: "0",
  otherServices: "0",
  cgst: "0",
  sgst: "0",
};

const App = () => {
  const [form, setForm] = useState(formData);
  const divRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const saveDivAsPDF = async () => {
    setIsLoading(true);
    if (divRef.current) {
      const input = divRef.current;
      const canvas = await html2canvas(input, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#c6b16e",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("invoice.pdf");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between">
      <div ref={divRef} id="main" className="max-w-[1200px]   bg-[#c6b16e]">
        <div className="text-[100px] uppercase font-bold bg-[#214132] text-center text-[#c6b16e]">
          Your Invoice
        </div>
        <div className="grid grid-cols-2 gap-y-1 gap-x-14 px-4 text-sm my-10">
          <div className="flex flex-col text-lg uppercase gap-y-2 rounded-lg text-[#214132] p-2 justify-center pl-10">
            <p className="font-bold">
              Hotel Name:{" "}
              <span className="font-normal">Palm Edge Paradise</span>
            </p>
            {/* <p className="font-bold">
              GSTIN: <span className="font-normal">---------</span>
            </p> */}
            <p className="font-bold">
              Address:{" "}
              <span className="font-normal">
                PEP FARMS, KHUNTIVALI VILLAGE, BEFORE BENDSHIL, OFF KHARVAI
                NAKA, BADLAPUR - NERAL ROAD, BADLAPUR EAST, MAHARASHTRA {"-"}{" "}
                421503
              </span>
            </p>
            <p className="font-bold">
              Invoice Number:{" "}
              <span className="font-normal">{form.invNumber}</span>
            </p>
            <p className="font-bold">
              Contact:{" "}
              <span className="font-normal">
                +91-8657570994/ pepfarms.official@gmail.com
              </span>
            </p>
            <p className="font-bold">
              Date:{" "}
              <span className="font-normal">
                {moment().format("DD-MM-YYYY")}
              </span>
            </p>
          </div>
          <div className="flex justify-end">
            <div className="w-56  flex justify-end">
              <img className="w-full object-contain mr-10" src={Logo} alt="" />
            </div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <div className="h-10 bg-[#8f3b1f] flex justify-center items-center uppercase text-[#c6b16e] ">
            <p className="text-center w-full font-bold text-xl">
              Guest Details
            </p>
          </div>
          <table className="w-full">
            <tbody className="border border-[#214132]">
              <tr className="border  border-[#214132]">
                <td className="border  border-[#214132] px-10    pb-2">
                  Name:{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.name}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Address:{" "}
                </td>
                <td className="border  border-[#214132] px-4    pb-2">
                  {form.address}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Contact:{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.contact}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 w-full">
          <div className="h-10 bg-[#8f3b1f] flex justify-center items-center uppercase text-[#c6b16e] ">
            <p className="text-center w-full font-bold text-xl">Stay Details</p>
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Check-in Date:{" "}
                </td>
                <td className="border  border-[#214132]  px-4  pb-2">
                  {form.checkindate}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Check-out Date:{" "}
                </td>
                <td className="border  border-[#214132]  px-4  pb-2">
                  {form.checkoutdate}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132]  px-10  pb-2">
                  Room Type:{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.roomtype}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Room Rate per Night:{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  Rs. {form.roomRatePerNight}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Number of Nights:{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.numberOfNights}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border bg-[#8f3b1f] text-[#c6b16e]  border-[#214132] p-2 uppercase">
                  <p className="text-center w-full font-bold text-lg flex justify-center items-center h-full">
                    Summary of Charges
                  </p>
                </th>
                <th className="border bg-[#8f3b1f] text-[#c6b16e]  border-[#214132]  p-2 uppercase">
                  <p className="text-center w-full font-bold text-lg flex justify-center items-center h-full">
                    Amount (INR)
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Accommodation
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.accommodation}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132]  px-10  pb-2">
                  Meals{" "}
                </td>
                <td className="border  border-[#214132]  px-4  pb-2">
                  {form.meals}
                </td>
              </tr>

              <tr>
                <td className="border  border-[#214132]  px-10  pb-2">
                  Spa Services{" "}
                </td>
                <td className="border   border-[#214132] px-4  pb-2">
                  {form.spaServices}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Activities{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.activities}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132] px-10   pb-2">
                  Games{" "}
                </td>
                <td className="border  border-[#214132] px-4   pb-2">
                  {form.games}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132]  px-10  pb-2">
                  Transportation{" "}
                </td>
                <td className="border  border-[#214132]  px-4  pb-2">
                  {form.transportation}
                </td>
              </tr>
              <tr>
                <td className="border  border-[#214132]  px-10  pb-2">
                  Other Services{" "}
                </td>
                <td className="border  border-[#214132]  px-4  pb-2">
                  {form.otherServices}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border bg-[#8f3b1f] text-[#c6b16e]  uppercase border-[#214132]  p-2">
                  <p className="text-center w-full font-bold text-lg">
                    Tax Details
                  </p>
                </th>
                <th className="border bg-[#8f3b1f] text-[#c6b16e]  uppercase  border-[#214132]  p-2">
                  <p className="text-center w-full font-bold text-lg">
                    Amount (INR)
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#214132] px-10   pb-2">
                  GST @ 9%(CGST)
                </td>
                <td className="border border-[#214132] px-4  pb-2">7,380</td>
              </tr>
              <tr>
                <td className="border border-[#214132]  px-10  pb-2">
                  GST @ 9%(SGST/UTGST){" "}
                </td>
                <td className="border border-[#214132] px-4  pb-2">7,380</td>
              </tr>
              <tr>
                <td className="border border-[#214132]  px-10  pb-2">
                  Total Tax{" "}
                </td>
                <td className="border border-[#214132] px-4  pb-2">14,760</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex justify-between items-center bg-[#214132] p-2 text-[#c6b16e]">
          <p className="uppercase font-bold px-8 text-3xl">Total</p>
          <div className="pr-20">
            <div>
              Advance Paid: <span className="font-bold">Rs. 5,760</span>
            </div>
            <div>
              Advance Due:<span className="font-bold"> Rs. 10,000</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pb-20 mt-2">
          <div className="flex flex-col mt-6 text-xs px-4 gap-y-2">
            <p>
              Please make payment by 30th April 2024. <br /> Accepted Payment
              Methods: Cash, Credit/Debit Card, Online Transfer, etc.
            </p>
            <div>
              <div className="font-bold bg-[#8f3b1f] text-[#c6b16e] inline-block px-2 py-1 rounded-md">
                Terms & Conditions:
              </div>
            </div>
            <ol className="list-decimal space-y-1 ml-3">
              <li>All rates are inclusive of taxes.</li>
              <li>Upon Cancellation advance paid will be forfeited.</li>
              <li>Identify proofs to be submitted on arrival</li>
              <li>
                ⁠Any damage to the property, whether accidental or wilful, is
                the responsibility of the registered guest for the loss incurred
                & will be charged for it.
              </li>
            </ol>
            <p className="mt-4">
              For any queries regarding this invoice or to request a duplicate
              copy, please contact us at the provided contact details.
              <br />
              Thank you for choosing Palm Edge Paradise. We hope you had a
              pleasant stay!
            </p>
          </div>

          <div className="">
            <div className="w-40 mr-36 mt-14">
              <img src={SmallLogo} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pr-10 pt-10">
        <Button onClick={() => setOpen(true)} className="w-full">
          Open Form
        </Button>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="min-w-[800px]">
          <div className="p-10 gap-y-2 grid grid-cols-2 gap-x-2">
            <div className="w-full">
              <Label>Name</Label>
              <Input
                className="w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={`Enter Name`}
              />
            </div>
            <div>
              <Label>Address</Label>

              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder={`Enter Address`}
              />
            </div>
            <div>
              <Label>Contact</Label>

              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder={`Enter Contact`}
              />
            </div>
            <div>
              <Label>Check In Date</Label>

              <Input
                type="date"
                value={form.checkindate}
                onChange={(e) =>
                  setForm({ ...form, checkindate: e.target.value })
                }
                placeholder={`Enter Check in Date`}
              />
            </div>
            <div>
              <Label>Check Out Date</Label>

              <Input
                type="date"
                value={form.checkoutdate}
                onChange={(e) =>
                  setForm({ ...form, checkoutdate: e.target.value })
                }
                placeholder={`Enter Check Out Date`}
              />
            </div>
            <div>
              <Label>Room Type</Label>

              <Input
                value={form.roomtype}
                onChange={(e) => setForm({ ...form, roomtype: e.target.value })}
                placeholder={`Enter Room Type`}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <Label>Room Rate Per Night</Label>

                <Input
                  value={form.roomRatePerNight}
                  onChange={(e) =>
                    setForm({ ...form, roomRatePerNight: e.target.value })
                  }
                  placeholder={`Enter Room Rate per night`}
                />
              </div>
              <div>
                <Label>Number of Nights</Label>

                <Input
                  value={form.numberOfNights}
                  onChange={(e) =>
                    setForm({ ...form, numberOfNights: e.target.value })
                  }
                  placeholder={`Enter No. of nights`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <Label>Acommodation</Label>

                <Input
                  value={form.accommodation}
                  onChange={(e) =>
                    setForm({ ...form, accommodation: e.target.value })
                  }
                  placeholder={`Enter accommodation`}
                />
              </div>
              <div>
                <Label>Meals</Label>

                <Input
                  value={form.meals}
                  onChange={(e) => setForm({ ...form, meals: e.target.value })}
                  placeholder={`Enter meals`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <Label>Spa Services</Label>

                <Input
                  value={form.spaServices}
                  onChange={(e) =>
                    setForm({ ...form, spaServices: e.target.value })
                  }
                  placeholder={`Enter spa Services`}
                />
              </div>
              <div>
                <Label>Activities</Label>

                <Input
                  value={form.activities}
                  onChange={(e) =>
                    setForm({ ...form, activities: e.target.value })
                  }
                  placeholder={`Enter activities`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <Label>Games</Label>

                <Input
                  value={form.games}
                  onChange={(e) => setForm({ ...form, games: e.target.value })}
                  placeholder={`Enter games`}
                />
              </div>
              <div>
                <Label>Transportation</Label>

                <Input
                  value={form.transportation}
                  onChange={(e) =>
                    setForm({ ...form, transportation: e.target.value })
                  }
                  placeholder={`Enter transportation`}
                />
              </div>
            </div>
            <div>
              <Label>Other Services</Label>

              <Input
                value={form.otherServices}
                onChange={(e) =>
                  setForm({ ...form, otherServices: e.target.value })
                }
                placeholder={`Enter otherServices`}
              />
            </div>
            <Button
              disabled={isLoading}
              onClick={saveDivAsPDF}
              className="w-full col-span-2"
            >
              Genrate pdf
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="top-0 fixed flex justify-center items-center w-full h-screen z-[4000000000000] bg-black/50">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
