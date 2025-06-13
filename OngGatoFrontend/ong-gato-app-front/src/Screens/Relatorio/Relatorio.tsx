import ReactECharts from 'echarts-for-react';
import Card from "../../Components/Layout/Card";
import Footer from '../../Components/Layout/Footer'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Relatorio = () => {
  const donationByMonth = {
    months: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
    values: [12, 19, 9, 22, 15, 18, 25, 20, 30, 28, 26, 34]
  };

  const donationTypes = [
    { value: 15, name: 'Alimentos' },
    { value: 10, name: 'Roupas' },
    { value: 5, name: 'Dinheiro' },
    { value: 4, name: 'Outros' }
  ];

  const animalsReceived = [
    { name: 'Cães', value: 12 },
    { name: 'Gatos', value: 8 },
  ];

  const lineOptions = {
    title: { text: 'Doações por Mês (Últimos 12 meses)', left: 'center' },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: donationByMonth.months },
    yAxis: { type: 'value' as const },
    series: [{
      data: donationByMonth.values,
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
      data: donationTypes,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const barOptions = {
    title: { text: 'Animais Recebidos (Último Mês)', left: 'center' },
    tooltip: { trigger: 'axis' as const },
    xAxis: { type: 'category' as const, data: animalsReceived.map(a => a.name) },
    yAxis: { type: 'value' as const },
    series: [{
      data: animalsReceived.map(a => a.value),
      type: 'bar' as const,
      itemStyle: { color: '#10b981' },
      barWidth: '50%'
    }]
  };

  return (
    <>
    {/* GRÁFICOS */}
      <div className="min-h-full">
        <main className="py-10 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <Card><ReactECharts option={lineOptions} /></Card>
            <Card><ReactECharts option={pieOptions} /></Card>
            <Card><ReactECharts option={barOptions} /></Card>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
