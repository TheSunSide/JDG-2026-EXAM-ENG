-- ============================================================================
-- REQUEST_5.sql - Somnia Data
-- ============================================================================
-- Objective: Retrieve all intervention plans with their associated profile and user created between 
--            December 1st and January 1st, sorted chronologically by creation date
-- ============================================================================

SELECT ip.*, p.*, u.*
FROM interventionPlans ip 
JOIN profiles p ON p.profileId = ip.profileId
JOIN users u ON u.userId = p.userId
GROUP BY ip.planId, p.profileId
where MONTH(ip.creation) = 12 AND DAY(ip.creation) >= 1
ORDER BY ip.creation asc;

