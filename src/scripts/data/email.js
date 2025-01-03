document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-btn').addEventListener('click', function() {
        location.href = '../../index.html';
    });

    document.getElementById('email-workout-btn').addEventListener('click', function() {
        emailReport('workout');
    });

    document.getElementById('email-habits-btn').addEventListener('click', function() {
        emailReport('habits');
    });

    document.getElementById('email-protein-btn').addEventListener('click', function() {
        emailReport('protein');
    });
});

function emailReport(type) {
    const subject = `Your ${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    const body = `Here is your ${type} report for the last 30 days.`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}