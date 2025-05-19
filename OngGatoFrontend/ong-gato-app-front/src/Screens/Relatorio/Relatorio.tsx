import ReactECharts from 'echarts-for-react';
import Card from "../../Components/Layout/Card";

export const Relatorio = () => {
    const donationByMonth = {
        months: [
            'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out',
            'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'
        ],
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
        title: {
            text: 'Doações por Mês (Últimos 12 meses)',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis' as const
        },
        xAxis: {
            type: 'category' as const,
            data: donationByMonth.months
        },
        yAxis: {
            type: 'value' as const
        },
        series: [
            {
                data: donationByMonth.values,
                type: 'line' as const,
                smooth: true,
                areaStyle: {},
                color: '#3b82f6'
            }
        ]
    };

    const pieOptions = {
        title: {
            text: 'Tipos de Doações (Último Mês)',
            left: 'center'
        },
        tooltip: {
            trigger: 'item' as const
        },
        legend: {
            orient: 'vertical' as const,
            left: 'left'
        },
        series: [
            {
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
            }
        ]
    };

    const barOptions = {
        title: {
            text: 'Animais Recebidos (Último Mês)',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis' as const
        },
        xAxis: {
            type: 'category' as const,
            data: animalsReceived.map(a => a.name)
        },
        yAxis: {
            type: 'value' as const
        },
        series: [
            {
                data: animalsReceived.map(a => a.value),
                type: 'bar' as const,
                itemStyle: {
                    color: '#10b981'
                },
                barWidth: '50%'
            }
        ]
    };

    return (
        <div className="h-full p-6 flex flex-wrap gap-3">
            <Card className="!m-0 bg-white p-2 w-full">
                <ReactECharts option={lineOptions} style={{ height: 400 }} />
            </Card>

            <div className="w-full flex flex-grow flex-col lg:flex-row gap-4">
                <Card className="!m-0 bg-white p-2 w-full">
                    <ReactECharts option={pieOptions} style={{ height: 400 }} />
                </Card>

                <Card className="!m-0 bg-white p-2 w-full">
                    <ReactECharts option={barOptions} style={{ height: 400 }} />
                </Card>
            </div>
        </div>
    );
};
