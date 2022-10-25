import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%ds",
    m: "1m",
    mm: "%dm",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const formatTime = (t: Date) => {
  if (t == null) {
    return null;
  }
  const d = new Date(t);
  return d.toLocaleTimeString();
};

export const formatTimeDateYear = (t: Date) => {
  if (t == null) {
    return null;
  }
  const d = new Date(t);
  return d.toLocaleString();
};

export const formatGetHour = (t: Date) => {
  if (t == null) {
    return null;
  }
  const d = new Date(t);
  return d.getHours();
};

export function formatHash(hash: string, index: number, chr: string) {
  if (index > hash?.length - 1) return hash;
  return (
    hash?.substring(0, index).slice(0, 6) +
    chr +
    hash?.substring(index + 1).slice(-6)
  );
}

export const sortValidatorsByVotingPower = (validatorsArray: any[]) =>
  validatorsArray?.sort(
    (validator1, validator2) => validator2.tokens - validator1.tokens
  );

export const roundValidatorsVotingPowerToWholeNumber = (data: any) => {
  const bondDenom: any = 1000000;
  return Math.round(data / bondDenom)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getValidatorsLogoFromWebsites = (websiteURL: any) => {
  return "http://www.google.com/s2/favicons?domain=" + websiteURL;
};

export const getPercentageOfValidatorsBondedTokens = (
  validatorsToken: number,
  totalBondedTokens: number
) => {
  var percentageOfBondedTokens: number;
  percentageOfBondedTokens =
    (Number(validatorsToken) / Number(totalBondedTokens)) * 100;
  return percentageOfBondedTokens;
};

//sort delegators shares by highest amount
export const sortDelegatorsByAmount = (delegatorsArray: any[]) =>
  delegatorsArray?.sort(
    (delegation1, delegation2) =>
      delegation2.balance.amount - delegation1.balance.amount
  );

//sort undelegators shares by highest balance
export const sortUnDelegationsByBalance = (unDelegatorsArray: any[]) =>
  unDelegatorsArray?.sort(
    (unDelegation1, unDelegation2) =>
      unDelegation2.entries[0].balance - unDelegation1.entries[0].balance
  );

//function to convert voting periods to days
export const periodsInDays = (periodsInSeconds: any) => {
  //use slice to remove s attached to the string
  let t = periodsInSeconds?.slice(0, -1);
  const periodDays = Math.floor(t / (3600 * 24)) + " days";
  return periodDays;
};

//function to convert voting periods to days
export const periodsInMinutes = (periodsInSeconds: any) => {
  //use slice to remove s attached to the string
  let t = periodsInSeconds?.slice(0, -1);
  const periodDays = Math.floor(t / 60) + "minutes";
  return periodDays;
};

//function that gives space to numbers
export const numberWithSpaces = (x: any) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

//tx messages
export function abbrMessage(msg) {
  if (Array.isArray(msg)) {
    const sum = msg
      .map((x) => abbrMessage(x))
      .reduce((s, c) => {
        const sh = s;
        if (sh[c]) {
          sh[c] += 1;
        } else {
          sh[c] = 1;
        }
        return sh;
      }, {});
    const output = [];
    Object.keys(sum).forEach((k) => {
      output.push(sum[k] > 1 ? `${k}×${sum[k]}` : k);
    });
    return output.join(", ");
  }
  if (msg["@type"]) {
    return msg["@type"]
      .substring(msg["@type"].lastIndexOf(".") + 1)
      .replace("Msg", "");
  }
  if (msg.typeUrl) {
    return msg.typeUrl
      .substring(msg.typeUrl.lastIndexOf(".") + 1)
      .replace("Msg", "");
  }
  return msg.type.substring(msg.type.lastIndexOf("/") + 1).replace("Msg", "");
}

export const formatNumbers = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export function toDay(time: any, format = "long") {
  if (format === "long") {
    return dayjs(time).format("YYYY-MM-DD HH:mm");
  }
  if (format === "date") {
    return dayjs(time).format("YYYY-MM-DD");
  }
  if (format === "time") {
    return dayjs(time).format("HH:mm:ss");
  }
  if (format === "from") {
    return dayjs(time).fromNow();
  }
  if (format === "to") {
    return dayjs(time).toNow();
  }
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}
