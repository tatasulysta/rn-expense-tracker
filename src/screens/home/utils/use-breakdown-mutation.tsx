import React from "react";
import { Mutation, MutationType } from "../../../store/auth.schema";
import { resetTime } from "../../../utils/date";
import {
  addDays,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const setMonth = (month: number, year: number) => {
  const temp = new Date();
  temp.setMonth(month);
  temp.setFullYear(year);
  return resetTime(new Date(temp));
};

export const generateMonthRange = (year: number) => {
  return Array(12)
    .fill("")
    .map((_, index) => {
      const temp = setMonth(index + 1, year);
      return { start: startOfMonth(temp), end: endOfMonth(temp) };
    });
};

function generateWeekRange(year, month) {
  let currentDate = startOfMonth(new Date(year, month));

  const weekRanges: { start: Date; end: Date }[] = [];

  for (let i = 0; i < 4; i++) {
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
    weekRanges.push({
      start: startOfCurrentWeek,
      end: endOfCurrentWeek,
    });
    currentDate = addWeeks(currentDate, 1);
  }

  return weekRanges;
}

const groupByCategory = (mutations: Mutation[]) => {
  const category: string[] = [];
  let total: number = 0;
  const groupCategory: {
    [key: string]: Mutation[];
  } = {};

  mutations.forEach((mutation) => {
    const key = `${mutation.categoryName}|${mutation.categoryId}`;
    if (category.includes(key)) {
      groupCategory[key].push(mutation);
    } else {
      groupCategory[key] = [mutation];
      category.push(key);
    }
    total += mutation.amount;
  });
  return { datas: groupCategory, total };
};

export function useBreakdownMutationByDate({
  mutations,
  year,
  weekly,
}: {
  mutations: Mutation[];
  year: number;
  weekly: Date;
}) {
  const mutationGroup = React.useMemo(() => {
    const template = generateMonthRange(year);
    const weekTemplate = generateWeekRange(
      weekly.getFullYear(),
      weekly.getMonth(),
    );
    const groupYear: {
      label: string;
      data: Mutation[];
      total: number;
    }[] = [];
    const groupWeek: {
      label: string;
      total: number;
    }[] = [];
    weekTemplate.forEach((week, index) => {
      const data = mutations.filter(
        (mutation) =>
          mutation.transactionAt >= week.start &&
          mutation.transactionAt <= week.end,
      );
      groupWeek.push({
        label: `week-${index + 1}`,
        total: data.reduce((prev, cur) => prev + cur.amount, 0),
      });
    });

    template.forEach((value) => {
      const data = mutations.filter(
        (mutation) =>
          mutation.transactionAt >= value.start &&
          mutation.transactionAt <= value.end,
      );
      groupYear.push({
        label: format(value.start, "MMM"),
        data: data,
        total: data.reduce((prev, curr) => prev + curr.amount, 0),
      });
    });
    return {
      group: groupYear,
      category: groupByCategory(mutations),
      groupWeek,
      weekGroup: weekTemplate,
    };
  }, [year, weekly]);
  return { mutationGroup };
}

export default function useBreakdownMutation({
  mutations,
}: {
  mutations: Mutation[];
}) {
  const mutationGroup = React.useMemo(() => {
    const groupByType = (() => {
      const group: { income: Mutation[]; expense: Mutation[] } = {
        income: [],
        expense: [],
      };
      mutations.forEach((mutation) => {
        if (mutation.type === MutationType.Expense)
          group["expense"].push(mutation);
        else group["income"].push(mutation);
      });
      return group;
    })();

    return {
      groupByType,
      income: groupByCategory(groupByType.income),
      expense: groupByCategory(groupByType.expense),
    };
  }, [mutations]);

  return mutationGroup;
}
