import { jsPDF } from "jspdf";
import { useEffect } from "react";

const Resume = ({ data }: any) => {
    const a4Width = 595.28;
    const a4Height = 841.89;
    const savePDF = () => {
        const pdf = new jsPDF('p', 'pt', [a4Width, a4Height])
        const element = document.getElementById("resume");
        if (element) {
            pdf.html(element, {
                callback: function (pdf) {
                    // Save the PDF to a file or display it
                    pdf.save(`${data?.basic?.name || 'resume'}.pdf`);
                },
            });
        }
    }
    const dateFormatted = (date: string) => {
        const d = new Date(date);
        const month = d.toLocaleString('default', { month: 'short' });
        return `${month} ${d.getFullYear()}`
    }
    return <div>
        <div className="fixed bottom-5 right-10">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => savePDF()}>Save PDF</button>
        </div>
        <div className="flex w-full justify-center">
            <div className="absolute" style={{
                width: 10 + 'px',
                minHeight: a4Height + 'px',
                borderBottom: '5px solid #ff0000',
                left: 'calc(50% - ' + ((a4Width / 2) + 10) + 'px)',
            }}></div>
            <div id="resume" className="text-xs p-6 flex flex-col" style={{
                width: a4Width + 'px',
                minHeight: a4Height + 'px',
                backgroundColor: '#fff',
                border: '1px solid #000',
                boxSizing: 'border-box',
                fontFamily: 'sans-serif',
                color: '#000',
            }}>
                <div className="flex justify-between mb-7">
                    <h1 className="text-3xl">{data?.basic?.name}</h1>
                    <div className="text-right">
                        <div>{data?.basic?.email}</div>
                        <div>{data?.basic?.website}</div>
                    </div>
                </div>
                <h2 className="text-xl">Experience</h2>
                {data?.experience?.map((experience: any) => {
                    return <table className="table-fixed mt-5 w-full">
                        <tbody>
                            <tr className="align-top">
                                <td className="text-sm">{experience?.company}</td>
                                <td colSpan={2} >{experience?.position}</td>
                                <td className="text-right">{dateFormatted(experience?.startDate)} - {dateFormatted(experience?.endDate)}</td>
                            </tr>
                            <tr style={{ fontSize: 10 }}>
                                {experience.location}
                            </tr>
                            <tr><td /><td colSpan={3} className="text-xs"><ul className="list-inside">
                                {experience?.achievement.map((a: any) => {
                                    if (!a.hide)
                                        return <li> - {a.achievement_msg}</li>
                                })}
                            </ul></td></tr>
                        </tbody>
                    </table>
                })}

                <h2 className="text-xl mt-5">Education</h2>
                {data?.education?.map((education: any) => {
                    return <table className="table-fixed mt-5 w-full">
                        <tbody>
                            <tr className="align-top">
                                <td>{education?.institutionName}</td>
                                <td colSpan={2}>{education?.major} ({education.score})</td>
                                <td className="text-right">{dateFormatted(education?.startDate)} - {dateFormatted(education?.endDate)}</td>
                            </tr>
                            <tr><td /><td colSpan={3} className="text-xs"><ul className="list-disc">
                                {education?.achievement.map((a: any) => {
                                    if (!a.hide)
                                        return <li>{a.achievement_msg}</li>
                                })}
                            </ul></td></tr>
                        </tbody>
                    </table>
                })}
            </div>
        </div>
    </div>
};

export default Resume;
