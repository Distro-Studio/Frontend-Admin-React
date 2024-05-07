import {
  RiAwardLine,
  RiInformationLine,
  RiPhoneLine,
  RiShieldStarLine,
} from "@remixicon/react";

const profilMenus = [
  {
    title: "Account",
    items: [{ label: "Penghargaan", link: "", icon: RiAwardLine }],
  },
  {
    title: "Others",
    items: [
      { label: "Syarat dan Ketentuan", link: "", icon: RiShieldStarLine },
      { label: "Bantuan", link: "", icon: RiInformationLine },
      { label: "Kontak", link: "", icon: RiPhoneLine },
    ],
  },
];

export default profilMenus;
