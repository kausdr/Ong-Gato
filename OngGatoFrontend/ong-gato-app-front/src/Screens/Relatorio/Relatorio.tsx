import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import Card from "../../Components/Layout/Card";
import Footer from '../../Components/Layout/Footer';
import { Donation, DonationService } from "../../API/donation";
import { useAuth } from "../../Contexts/AuthContext";

export const Relatorio = () => {
   const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);

  const [donationByMonth, setDonationByMonth] = useState<{months: string[], values: number[]}>({
    months: [],
    values: []
  });

  const [donationTypes, setDonationTypes] = useState<{value: number, name: string}[]>([]);

  useEffect(() => {
    async function fetchDonations() {
      if (!user) return;

      const serviceCall = user.isAdmin
        ? DonationService.getDonations()
        : DonationService.getMyDonations();

      const [data, error] = await serviceCall;

      if (error || !data) {
        console.error("Erro ao buscar doações", error);
        return;
      }

      setDonations(data);
    }

    fetchDonations();
  }, [user]);

  useEffect(() => {
    if (donations.length === 0) return;

    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const now = new Date();
    const last12Months: Date[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last12Months.push(d);
    }

    const monthLabels = last12Months.map(d => monthNames[d.getMonth()]);
    const monthValues = new Array(12).fill(0);

const currentMonth = now.getMonth();
const currentYear = now.getFullYear();


    const typesMap: Record<string, number> = {};

    donations.forEach(donation => {
      if (!donation.date || !donation.amount) return;

      const donationDate = new Date(donation.date);

      last12Months.forEach((monthStart, idx) => {
        const nextMonthStart = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);
        if (donationDate >= monthStart && donationDate < nextMonthStart) {
          monthValues[idx] += donation.amount!;
        }
      });

      if (donationDate.getFullYear() === currentYear && donationDate.getMonth() === currentMonth) {
        const typeName = donation.type;
        if (!typesMap[typeName]) typesMap[typeName] = 0;
        typesMap[typeName] += donation.amount!;
      }
    });

    const typesArray = Object.entries(typesMap).map(([name, value]) => ({ name, value }));

    setDonationByMonth({
      months: monthLabels,
      values: monthValues
    });

    setDonationTypes(typesArray);

  }, [donations]);

  const hasData = donationByMonth.values.some(v => v > 0);

  const lineOptions = {
    title: { text: 'Doações por Mês (Últimos 12 meses)', left: 'center' },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: donationByMonth.months },
    yAxis: { type: 'value' as const },
    series: [{
      data: hasData ? donationByMonth.values : [0],
      type: 'line' as const,
      smooth: true,
      areaStyle: {},
      color: '#3b82f6'
    }]
  };

  const pieOptions = {
    title: { text: 'Tipos de Doações (Último Mês)', left: 'center' },
    tooltip: { trigger: 'item' as const },
    legend: { orient: 'vertical' as const, left: 'left' },
    series: [{
      name: 'Tipo',
      type: 'pie' as const,
      radius: '60%',
      data: donationTypes.length ? donationTypes : [{ value: 1, name: 'Sem doações' }],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <>
      <div className="min-h-full">
        <main className="py-10 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Card><ReactECharts option={lineOptions} /></Card>
            <Card><ReactECharts option={pieOptions} /></Card>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
