/**
 * @file Interfaces related to the team information
 * @description Type definitions for team members and project details
 */

/**
 * Interface representing a team member
 */
export interface TeamMember {
  /**
   * Name of the team member
   */
  name: string;

  /**
   * Student ID number
   */
  nim: string;

  /**
   * Optional role of the team member
   */
  role?: string;

  /**
   * Optional image URL or path for the team member
   */
  image?: string;
}

/**
 * Interface representing a lecturer
 */
export interface Lecturer {
  /**
   * Name of the lecturer
   */
  name: string;

  /**
   * Optional title of the lecturer
   */
  title?: string;

  /**
   * Optional image URL or path for the lecturer
   */
  image?: string;
}

/**
 * Interface for project information
 */
export interface ProjectInfo {
  /**
   * Project title
   */
  title: string;

  /**
   * Brief description of the project
   */
  description: string;

  /**
   * Main features of the project
   */
  features: string[];

  /**
   * Project timeline or development stages
   */
  timeline?: {
    stage: string;
    description: string;
  }[];
}
